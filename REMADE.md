# -
微信小程序：采用vant组件
用途：公司年会抽奖 用户中奖一次后将不会再参与抽奖

sql文件在项目根目录 导入即可
我后端用的php 查询出的数据转一维度数组就好了
数组例：["张三","李四"]

停止后会触发接口 修改中奖人的中奖状态 也就是sql中的isok字段

下面是两个小程序触发的接口 直接贴下面了【命名比较随便 赶工写的 直接上的助手函数】


```php
        public function getokuser(){
        $userok = db('okuser')->where('isok',0)->field("username")->select();
        $last_names = array_column($userok, 'username');
        return json($last_names);
        }
        
        public function iosoks(){
        $userok = db('okuser')->where('username',input('username'))->update(['isok'=>1]);
        }
```
By-Daixs