//由于jQuery是全局变量，所以可以省略window.即：jQuery() = window.jQuery()

//由于jQuery不返回元素们，返回对象,所以需要声明一个变量来存放返回的对象，对象里有很多函数（方法）可以使用
const api = jQuery(".test");
//对象里的addClass方法可以给所有获取到的元素增加类，这里就是给所有类为test的元素再加一个类：red
api.addClass("red");
//上边添加类red后返回的东西还是一个对象（这个对象里有很多函数/方法），所以可以继续链式操作：
api.addClass("blue").addClass("green"); //这个操作就是链式操作，骚操作

//如果用一个对象调用函数，那么这个函数里的this就是这个对象，上边的就是
//就是说：obj.fn(p1) 等价于 obj.fn.call(this,p1)中的this就是obj

//查找元素：
jQuery(".test")
  .find(".child")
  .addClass("red")
  .addClass("blue")
  .addClass("green")
  .end() //end方法表示结束当前的api对象，返回上一层api对象进行操作
  .addClass("yellow"); //此时的addClass方法操作的是上一层，即把yellow类加到.test元素身上;

//找到所有的类为chlid的元素，并调用each方法遍历这些元素
const x = jQuery(".test").find(".child");
//each方法又接受一个函数fn，fn会打印出这些类为.child的元素
x.each(div => console.log(div));
//上边这行代码调用的是each方法(如下))，each方法里又有一个函数fn。each方法在某个时刻调用fn。而fn里又接收了一个参数elements[i]，上边的div就是指这个elements[i]
// each(fn) {
//     for (let i = 0; i < elements.length; i++) {
//         fn.call(null, elements[i], i);
//       }
//       return this;
//    },

//获取到test的爸爸：
const x2 = jQuery(".test");
x2.parent().print();

//获取儿子:
x2.children().print();
