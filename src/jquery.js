window.jQuery = function(selectorOrArray) {
  let elements; //变量作用域提升，因为在if里声明的话就只能作用在if内部了
  if (typeof selectorOrArray === "string") {
    //elements是一个数组，包含获取到的所有selector元素
    elements = document.querySelectorAll(selectorOrArray);
    //jQuery获取元素selector,但是并不能返回这个元素，只能返回一个对象，通过对象里的函数（方法）可以操控这个元素
  } else if (selectorOrArray instanceof Array) {
    elements = selectorOrArray;
  }
  //下边是jQuery返回的对象，对象里有属性addClass等,这些属性是方法（即函数）
  return {
    //在一个div里找一个元素
    find(selector) {
      let array = [];
      //遍历elements数组
      for (let i = 0; i < elements.length; i++) {
        //在elements数组的每个元素里找到selector对应的所有元素,这些元素是一个伪数组；
        // 用Array.from变成真正的数组，并赋值给elements2
        const elements2 = Array.from(elements[i].querySelectorAll(selector));
        //再把空数组连接伪数组，合起来组成新的数组，这个新数组里就是找到的所有selector元素
        array = array.concat(elements2);
      }
      //返回这个新数组:
      // return array; //但此时就不能进行链式操作了，因为返回的array是一个纯数组
      //return this也不行，因为此时的this指的是调用find函数的对象；
      //这个时候继续链式操作操作的是之前的对象，而不是现在find(selector)之后的对象

      array.oldApi = this; //this就是api
      // const newApi = jQuery(array); //构建一个新的api对象
      // return newApi; //查找元素后返回新的api对象，从而可以继续链式操作
      return jQuery(array); //上边两行代码可以简写为这一行代码
    },
    //遍历当前的所有元素
    each(fn) {
      for (let i = 0; i < elements.length; i++) {
        fn.call(null, elements[i], i);
      }
      return this;
    },
    //获取每个元素的爸爸：
    parent() {
      const array = [];
      this.each(node => {
        if (array.indexOf(node.parentNode) === -1) {
          array.push(node.parentNode);
        }
      });
      //jQuery封装一个对象，该对象可以操作array：
      return jQuery(array);
    },
    //获取儿子：
    children() {
      const array = [];
      this.each(node => {
        //...node.children的意思是把这个数组拆开，因为node.child得到的也是一个数组
        array.push(...node.children);
      });
      return jQuery(array);
    },
    //打印出元素：
    print() {
      console.log(elements);
    },
    //给获取到的元素添加类className:
    addClass(className) {
      //该写法等于："addClass":function(){}
      //遍历获取到的元素，给每个元素添加类：
      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.add(className);
      } //这就是闭包：函数addClass访问了外部的变量elements
      return this; //this就是上边返回的对象；
      //用到的知识：如果一个对象调用一个函数（方法），那么函数（又称方法）里的this就是这个对象；
      //函数（方法）可以通过this访问调用这个函数（方法）的对象。
    },
    oldApi: selectorOrArray.oldApi,
    //结束当前api，返回上一个api
    end() {
      return this.oldApi; //this就是当前的api//api2
    }
  };
};
