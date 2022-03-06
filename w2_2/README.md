#### **w2_2 作业**





**1. 部署合约Score**

https://www.oklink.com/zh-cn/oec-test/tx/0xbf55090b1af1553b25ee3206dec34b52fb71c1780c7f88c1660c02ed03e0a626


部署合约Score的时候同时部署了Teacher合约

Score合约地址：0xC65cDe6Db74C063969E045D51510C7A475727c22
Teacher合约地址：0xEBf50C84307bC3B1a6f1266756859006892bfcF0

**2. 修改学生分数**

使用remix载入Teacher合约（0xEBf50C84307bC3B1a6f1266756859006892bfcF0），然后调用setScore函数

https://www.oklink.com/zh-cn/oec-test/tx/0xb488c3fafa1ec9559fae09d1994215aa97fc69963035b2865ec156b715898448







**-编写合约Score，⽤于记录学⽣（地址）分数**

**-仅有⽼师（⽤modifier权限控制）可以添加和修改学⽣分数**

**-分数不可以⼤于 100**

**-编写合约 Teacher 作为⽼师，通过 IScore 接⼝调⽤修改学⽣分数**
