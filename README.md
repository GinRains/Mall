# mall

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 九.tabControl的吸顶效果

#### 9.1.获取到tabControl的offsetTop

* 必须知道滚动到多少时，开始吸顶效果，这个就需要获取tabControl的offsetTop
* 但是，如果直接在mounted中获取tabControl的offsetTop是不正确的
* 如何获取正确值呢？
  * 监听HomeSwiper中img的加载完成
  * 加载完成后，发出事件，在Home.vue中，获取正确的值
  * 补充：
    * 为了不让HomeSwiper多次发出事件
    * 可以使用isLoad的变量进行状态的记录
  * 注意：这里不进行多次调用和debounce的区别

#### 9.2.监听滚动，动态的改变tabControl的样式

* 问题：动态的改变tabControl样式时，会出现两个问题
  * 问题一：下面的商品内容，会突然上移
  * 问题二：tabControl虽然设置了fixed，但是也随着better-Scroll一起滚出去了
* 其他方案来解决问题
  * 在最上面，多复制一份PlaceHolderTabControl组件对象，利用它来实现停留效果
  * 当用户滚动到一定位置时，PlaceHolderTabControl显示出来
  * 当用户滚动没有达到一定位置时，PlaceHolderTabControl隐藏起来

### 十. 让Home保持原来的状态

#### 10.1. 让Home不要随意销毁掉

* keep-alive

### 10.2. 让Home中的内容保持原来的位置

* 离开时，保存一个位置信息saveY
* 进来时，将位置设置为原来保存的位置saveY信息即可
  * 注意：最好回来时，进行一次refresh()

## 详情页实现思路

### 一. 点击商品进入详情页





