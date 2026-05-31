import hashlib
import mimetypes
import os
import re
import shutil
import sys
from pathlib import Path
from urllib.parse import urlparse

import requests


POSTS_ROOT = Path("source/_posts")
LEGACY_IMG_ROOT = Path("source/img")
IMAGE_REF_RE = re.compile(
    r"(!\[[^\]]*]\()([^)]+)(\))|(<img\b[^>]*?\bsrc\s*=\s*[\"'])([^\"']+)([\"'][^>]*>)",
    re.IGNORECASE,
)


def usage():
    print("Usage: python yuque.py <source/_posts/YYYY/MM/post-name/post-name.md>")


def resolve_markdown_path(arg):
    md_path = Path(arg)
    if not md_path.is_absolute():
        direct = md_path
        under_posts = POSTS_ROOT / md_path
        if direct.exists():
            md_path = direct
        elif under_posts.exists():
            md_path = under_posts
        else:
            md_path = direct

    return md_path


def is_packaged_post(md_path):
    try:
        rel = md_path.resolve().relative_to(POSTS_ROOT.resolve())
    except ValueError:
        return False

    parts = rel.parts
    return (
        len(parts) == 4
        and re.fullmatch(r"\d{4}", parts[0]) is not None
        and re.fullmatch(r"\d{2}", parts[1]) is not None
        and parts[3].lower().endswith(".md")
    )


def extension_from_url(url):
    ext = Path(urlparse(url).path).suffix.lower()
    if ext in {".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".bmp"}:
        return ext
    return ""


def extension_from_content_type(content_type):
    ext = mimetypes.guess_extension((content_type or "").split(";")[0].strip())
    if ext == ".jpe":
        return ".jpg"
    return ext or ".png"


def unique_output_path(img_dir, preferred_name):
    output = img_dir / preferred_name
    if not output.exists():
        return output

    stem = output.stem
    suffix = output.suffix
    index = 2
    while True:
        candidate = img_dir / f"{stem}-{index}{suffix}"
        if not candidate.exists():
            return candidate
        index += 1


def download_remote_image(url, img_dir, index):
    img_dir.mkdir(parents=True, exist_ok=True)
    ext = extension_from_url(url)
    url_hash = hashlib.sha1(url.encode("utf-8")).hexdigest()[:8]

    print(f"正在下载图片: {url}")
    response = requests.get(url, stream=True, timeout=20)
    response.raise_for_status()

    if not ext:
        ext = extension_from_content_type(response.headers.get("content-type"))

    output = unique_output_path(img_dir, f"{index}-{url_hash}{ext}")
    with open(output, "wb") as f:
        for chunk in response.iter_content(chunk_size=8192):
            if chunk:
                f.write(chunk)

    print(f"图片已保存: {output}")
    return f"img/{output.name}"


def copy_legacy_image(ref, img_dir):
    normalized = ref.replace("\\", "/")
    match = re.match(r"^(?:\.\./)?img/([^/]+)/(.+)$", normalized) or re.match(
        r"^/img/([^/]+)/(.+)$", normalized
    )
    if not match:
        return None

    folder, asset_rel = match.groups()
    old_file = LEGACY_IMG_ROOT / folder / Path(asset_rel)
    if not old_file.exists():
        return None

    target = img_dir / Path(asset_rel)
    target.parent.mkdir(parents=True, exist_ok=True)
    if not target.exists():
        shutil.copy2(old_file, target)

    print(f"旧图片已迁入: {old_file} -> {target}")
    return "img/" + Path(asset_rel).as_posix()


def collect_refs(content):
    refs = []
    for match in IMAGE_REF_RE.finditer(content):
        refs.append(match.group(2) or match.group(5))
    return refs


def rewrite_refs(content, replacements):
    def replace(match):
        if match.group(1):
            src = match.group(2)
            return f"{match.group(1)}{replacements.get(src, src)}{match.group(3)}"

        src = match.group(5)
        return f"{match.group(4)}{replacements.get(src, src)}{match.group(6)}"

    return IMAGE_REF_RE.sub(replace, content)


def process_markdown(md_path):
    if not md_path.exists():
        raise FileNotFoundError(f"找不到文件: {md_path}")
    if not is_packaged_post(md_path):
        raise ValueError(
            "yuque.py 现在只处理文章包结构: source/_posts/YYYY/MM/post-name/post-name.md"
        )

    img_dir = md_path.parent / "img"
    content = md_path.read_text(encoding="utf-8")
    refs = collect_refs(content)
    replacements = {}
    remote_index = 1

    for ref in refs:
        if ref in replacements or ref.startswith("img/"):
            continue

        if re.match(r"^https?://", ref, re.IGNORECASE):
            try:
                replacements[ref] = download_remote_image(ref, img_dir, remote_index)
                remote_index += 1
            except requests.RequestException as exc:
                print(f"警告：下载失败，保留原链接: {ref} ({exc})")
            continue

        copied = copy_legacy_image(ref, img_dir)
        if copied:
            replacements[ref] = copied

    if replacements:
        md_path.write_text(rewrite_refs(content, replacements), encoding="utf-8")
        print(f"文件已更新: {md_path}")
    else:
        print("没有需要处理的图片链接。")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        usage()
        sys.exit(1)

    try:
        process_markdown(resolve_markdown_path(" ".join(sys.argv[1:])))
    except Exception as exc:
        print(f"错误：{exc}")
        sys.exit(1)
