# gulpStaticPagesDemo
自己用的gulp文件，主要用来做切图外包
```
gulp serve
```
启动热更新，修改src目录，变化会同步到dist目录  

使用gulp-file-include做简单的模板
```
@@include('common/header.html',{"title":"导航"})
ok
@@include('common/footer.html')
```
公用部分模板放在common文件夹下  
然后在src根目录下添加html文件引用即可
[gulp-file-include](https://github.com/coderhaoxin/gulp-file-include)
