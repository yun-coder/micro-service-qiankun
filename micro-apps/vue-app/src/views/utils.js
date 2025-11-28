const Util = {}
//==================== 文件转换相关函数=====================================

// TODO 将arraybuffer 转换成 base64
Util.arrayBufferToBase64 = function (buffer) {
  let binary = '';
  let bytes = new Uint8Array(buffer);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

// TODO 将base64转换成blob responseType
Util.dataURLtoFile = function (dataURI) {
  const arr = dataURI.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bStr = atob(arr[1])
  let n = bStr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bStr.charCodeAt(n)
  }
  return new Blob([u8arr], {type: mime})
}

// TODO 将File文件转成base64
Util.fileToBase64 = function (file) {
  return window.URL.createObjectURL(file)
}

//=======================================================================


//========================树形相关方法===============================
/**
 console.log('getListFromTree', getListFromTree(treeData))
 console.log('getNodeByKey', getNodeByKey(treeData, '0-0-0'))
 console.log('getChildrenToList', getChildrenToList(treeData, '0-1'))
 console.log(forEachNode(treeData, (v: any, list: any) => {console.log('子项：', v)}))
 console.log('getParentNodes', getParentNodes('0-0-1-0', treeData))
 **/
/**
 * 将树型结构数据转换成一维数组
 * @param treeData
 */
Util.getListFromTree = function (treeData) {
  let props = {children: 'children'};
  let tempList = [];
  treeData.forEach((v) => {
    tempList.push(v);
    let children = v[props.children];
    if (children && children.length > 0) {
      tempList = [...tempList, ...Util.getListFromTree(children, props)];
    }
  });
  return tempList;
}
/**
 * 寻找指定子节点
 * @param treeData
 * @param key
 */
Util.getNodeByKey = function (treeData, key) {
  let props = {key: 'key', children: 'children'};
  if (!treeData || treeData.length === 0) {
    return null;
  }
  for (let i = 0; i < treeData.length; i++) {
    let node = treeData[i];
    if (node[props.key] === key) {
      return node;
    }
    let children = node[props.children];
    if (children && children.length > 0) {
      let targetNode = Util.getNodeByKey(children, key, props);
      if (targetNode) {
        return targetNode;
      }
    }
  }
  return null;
}
/**
 * 获取节点下的所有子节点
 * @param treeData
 * @param key
 */
Util.getChildrenToList = function (treeData, key) {
  let props = {key: 'key', children: 'children'};
  let targetNode = Util.getNodeByKey(treeData, key, props);
  if (!targetNode) {
    return [];
  }
  let children = targetNode[props.children];
  if (children && children.length > 0) {
    return Util.getListFromTree(children, props);
  }
  return [];
}
/**
 * 遍历每个树节点
 * @param list
 * @param callback
 */
Util.forEachNode = (list, callback) => {
  let props = {children: 'children'};
  list.forEach(v => {
    callback(v, list);
    let children = v[props.children];
    if (children && children.length > 0) {
      Util.forEachNode(children, callback, props);
    }
  });
}
/**
 * 获取父级结点
 * @param key 目标节点的父节点的key
 * @param data  线性结构数据
 */
Util.loopParentNodes = function (key, data) {
  let props = {key: 'key', parentKey: 'parentKey', children: 'children'};
  let parentNodes = [];
  let target = data.filter(v => v[props.key] === key)[0];
  if (target) {
    parentNodes.push(target);
    parentNodes = [...parentNodes, ...Util.loopParentNodes(target[props.parentKey], data, props)];
  }
  return parentNodes;
}
/**
 * 获取所有父节点
 * @param key
 * @param tree
 */
Util.getParentNodes = function (key, tree) {
  let props = {key: 'key', parentKey: 'parentKey', children: 'children', isTree: true};
  let data = props.isTree ? Util.getListFromTree(tree, props) : tree;
  let targetNode = data.filter((v) => v[props.key] === key)[0];
  if (!targetNode) {
    return [];
  }
  return Util.loopParentNodes(targetNode[props.parentKey], data, props);
}

//=======================================================

// TODO 去除头尾空格
Util.trim = function (str) {
  let i = 0
  let j = str.length - 1

  function isWhite(s) {
    return /\s/.test(s)
  }

  while (isWhite(str[i])) {
    i++
  }
  while (isWhite(str[j])) {
    j--
  }
  return str.substring(i, j + 1)
}

// TODO 根据子级id获取父级id 内部 code 根据实际字段调整
Util.getFatherNode = function (source, val, code = "code", gather = 'children') {
  const toFlatArray = (tree, parentId) => {
    return tree.reduce((t, obj) => {
      const child = obj[gather];
      return [
        ...t,
        parentId ? {...obj, parentId} : obj,
        ...(child && child.length ? toFlatArray(child, obj[code]) : []),
      ];
    }, []);
  };
  const getIds = (flatArray) => {
    let ids = [val];
    let child = flatArray.find((item) => item[code] === val);
    while (child && child.parentId) {
      ids = [child.parentId, ...ids];
      child = flatArray.find((item) => item[code] === child.parentId);
    }
    return ids;
  };
  return getIds(toFlatArray(source));
}

// 深度清除 对象的属性
Util.deepClear = function (source) {
  const targetObj = source.constructor === Array ? [] : {};
  for (let keys in source) {
    // 遍历目标
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {};
        targetObj[keys] = Util.deepClear(source[keys]);
      } else {
        // 如果不是，就直接赋值
        source[keys] ? targetObj[keys] = source[keys] : '';
      }
    }
  }
  return targetObj;
}

// 树形目录转数组
Util.tree2Array = function (treeList, out = []) {
  treeList.forEach(v => {
    let t = {...v, hasChild: v.children && v.children instanceof Array && v.children.length ? true : false}
    delete t.children
    out.push(t)
    v.children && v.children.length > 0 ? Util.tree2Array(v.children, out) : ""
  })
}

// 数组转树 idName pidName 自定义值
Util.array2Tree = function (arr, idName = 'sn', pidName = 'psn') {
  let result = []
  if (!Array.isArray(arr)) {
    return result
  }

  let map = {};
  arr.forEach(item => {
    map[item[idName]] = item;
  });
  arr.forEach(item => {
    let parent = map[item[pidName]];
    if (parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      result.push(item);
    }
  })
  return result;
}

// todo 根据日期字符串获取星期几（如：2020-05-02）
Util.getWeek = function (dateString) {
  if (dateString) {
    const dateArray = dateString.split('-')
    const date = new Date(dateArray[0], parseInt(dateArray[1]) - 1, dateArray[2])
    return '周' + '日一二三四五六'.charAt(date.getDay())
  }
}

// todo 数组对象根据某一相同key合并成新的数组
Util.sortArr = function (arr, str) {
  let _arr = [], _t = [], _tmp;
  // 按照特定的参数将数组排序将具有相同值得排在一起
  arr = arr.sort(function (a, b) {
    let s = a[str], t = b[str];
    return s < t ? -1 : 1;
  });
  if (arr.length) {
    _tmp = arr[0][str];
  }
  // 将相同类别的对象添加到统一个数组
  for (let i in arr) {
    if (arr[i][str] === _tmp) {
      // console.log(_tmp)
      _t.push(arr[i]);
    } else {
      _tmp = arr[i][str];
      _arr.push(_t);
      _t = [arr[i]];
    }
  }
  // 将最后的内容推出新数组
  _arr.push(_t);
  return _arr;
}

// TODO 删除父级的指定属性
Util.delParentProp = function (arr, param = "id") {
  const son = []
  arr.map((item, index) => {
    // TODO 此处的id和外部的id可以改成需要的target
    if (item[param] == param) {
      if (item.children && item.children.length > 0) {
        item.children.map(v => {
          son.push(v)
        })
      }
      arr.splice(index, 1)
    }
    if (item.children) {
      Util.delParentProp(item.children, param)
    }
  })
  arr = arr.concat(son)
  return arr
}

// TODO 将路径参数解析为对象格式
Util.paramToObj = function (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ') +
    '"}'
  )
}

// TODO 阿拉伯数字转中文数字
Util.NoToChinese = function (num) {
  if (!/^\d*(\.\d*)?$/.test(num)) {
    return "Number is wrong!";
  }
  let AA = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  let BB = ["", "十", "百", "千", "万", "亿", "点", ""];
  let a = ("" + num).replace(/(^0*)/g, "").split("."),
    k = 0,
    re = "";
  for (let i = a[0].length - 1; i >= 0; i--) {
    switch (k) {
      case 0:
        re = BB[7] + re;
        break;
      case 4:
        if (!new RegExp("0{4}\\d{" + (a[0].length - i - 1) + "}$").test(a[0]))
          re = BB[4] + re;
        break;
      case 8:
        re = BB[5] + re;
        BB[7] = BB[5];
        k = 0;
        break;
    }
    if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0) re = AA[0] + re;
    if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re;
    k++;
  }
  //加上小数部分(如果有小数部分)
  if (a.length > 1) {
    re += BB[6];
    for (let i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)];
  }
  return re;
}

// TODO 异步加载图片允许跨域
Util.loadImg = function (url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.setAttribute("crossOrigin", "anonymous");
    img.onload = function () {
      resolve(img)
    }
    img.onerror = function () {
      reject(new Error('can not load image for' + url))
    }
    img.src = url
  })
}

// TODO 获取数组中只出现一次的元素
Util.uniqElement = function (arr) {
  const map = {}
  for (let k = 0; k < arr.length; k++) {
    map[arr[k]] = map[arr[k]] !== undefined ? (map[arr[k]] + 1) : 1
  }
  // console.log(map)
  for (let k in map) {
    if (map[k] === 1) {
      return k
    }
  }
}

// TODO 将对象转为数组
Util.objToArray = function (obj, keyName, valName) {
  let arr = []
  for (let i = 0; i < Object.keys(obj).length; i++) {
    arr.push({
      [keyName]: Object.keys(obj)[i],
      [valName]: obj[Object.keys(obj)[i]]
    })
  }
  return arr
}

// TODO 返回数组的 交集，并集，差集
Util.arr_union_intersect_difference = function (arr1, arr2, type = 'union') {
  let setArr1 = new Set(arr1)
  let setArr2 = new Set(arr2)
  //并集
  if (type == 'union') {
    return new Set([...setArr1, ...setArr2])
  } else if (type == 'intersect') {
    //交集
    return new Set([...setArr1].filter(x => setArr2.has(x)))
  } else {
    //差集
    return new Set([...setArr1].filter(x => !setArr2.has(x)))
  }
}

// TODO 数组洗牌
Util.shuffle = function (arr) {
  let result = [],
    random;
  while (arr.length > 0) {
    random = Math.floor(Math.random() * arr.length);
    result.push(arr[random])
    arr.splice(random, 1)
  }
  return result;
}

// TODO 数组扁平化 input 数据对象  shallow 是否全部
Util.flatten = function (input, shallow) {
  let output = [], idx = 0;
  for (let i = 0, length = input.length; i < length; i++) {
    let value = input[i];
    if (typeof value === "object") {
      if (!shallow) value = Util.flatten(value, shallow);
      let j = 0, len = value.length;
      output.length += len;
      while (j < len) {
        output[idx++] = value[j++];
      }
    } else {
      output[idx++] = value;
    }
  }
  return output;
}

// TODO 拍平多维数组
Util.flattenArray = function (arr) {
  const flattened = [].concat(...arr);// 第一步适用于二维数组
  // 判断所有是否还有数组，如果有递归 没有直接返回
  return flattened.some(item => Array.isArray(item))
    ? Util.flattenArray(flattened) : flattened;
}
//==============================排序方法===================================

// TODO 冒泡排序
Util.bubbleSort = function (arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        //相邻元素两两对比
        let temp = arr[j + 1];
        //元素交换
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}

// TODO 选择排序
Util.selectSort = function (arr) {
  let length = arr.length;
  for (let i = 0; i < length; i++) {   // 循环数组
    let _min = arr[i];
    // 把每一次的 数组里面的数字记录下来
    let k = i;
    // 记录下来索引
    for (let j = i + 1; j < length; j++) {
      // 当前的数字与后一个数字相比较
      if (_min > arr[j]) {
        //当前的数 大于 后面一个数的话
        _min = arr[j];
        //将后面的数值保存下来
        k = j;
        // 保存索引
      }
    }
    arr[k] = arr[i];
    // 进行交换位置
    arr[i] = _min;
  }
  return arr;
}

// TODO 插入排序的基本操作就是将一个数据插入到已经排好序的有序数据中，
//  从而得到一个新的、个数加一的有序数据, 像整理扑克牌
Util.insertionSort = function (arr) {
  let len = arr.length;
  let preIndex, current;
  for (let i = 1; i < len; i++) {
    preIndex = i - 1;
    current = arr[i];
    while (preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }
    arr[preIndex + 1] = current;
  }
  return arr;
}

// TODO 归并排序 服务 mergeSort
Util.mergeSort = function (arr) {
  if (arr.length == 1) {
    return arr;
  }
  /* 首先将无序数组划分为两个数组 */
  let mid = Math.floor(arr.length / 2);
  let left = arr.slice(0, mid);
  let right = arr.slice(mid);
  /* 递归分别对左右两部分数组进行排序合并 */
  return Util.mergeArr(Util.mergeSort(left), Util.mergeSort(right));
}
Util.mergeArr = function (left, right) {
  let re = [];
  while (left.length > 0 && right.length > 0) {
    if (left[0] < right[0]) {
      // 如果左边的数据小于右边的数据，将左边的数据取出，放到新数组那里
      re.push(left.shift());
    } else {
      re.push(right.shift());
    }
  }
  /* 当左右数组长度不等.将比较完后剩下的数组项链接起来即可 */
  return re.concat(left).concat(right);
}

// TODO 快速排序 推荐使用效率最高
Util.quickSort = function (arr) {
  //如果数组<=1,则直接返回
  if (arr.length <= 1) {
    return arr;
  }
  let pivotIndex = Math.floor(arr.length / 2);
  //找基准，并把基准从原数组删除
  let pivot = arr.splice(pivotIndex, 1)[0];
  //定义左右数组
  let left = [];
  let right = [];

  //比基准小的放在left，比基准大的放在right
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] <= pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  //递归
  return Util.quickSort(left).concat([pivot], Util.quickSort(right));
}

// TODO 二分搜索
Util.binarySearch = function (item) {
  let array = Util.quickSort(item);
  let low = 0, high = array.length - 1, mid, element;
  while (low <= high) {
    mid = Math.floor((low + high) / 2)
    element = array[mid];
    if (element < item) {
      low = mid + 1;
    } else if (element > item) {
      high = mid - 1;
    } else {
      return mid;
    }
    return -1;
  }
}

// TODO 验证是否是成对匹配的括号 [{()}]
Util.isValidSymbol = function (s) {
  const len = s.length;
  if (len % 2 !== 0) {
    return false;
  }
  const pairs = new Map([
    [')', '('],
    ['}', '{'],
    [']', '['],
  ])
  let stk = [];
  for (let ch of s) {
    if (pairs.has(ch)) {
      if (!stk.length || stk[stk.length - 1] !== pairs.get(ch)) {
        return false;
      }
      stk.pop();
    } else {
      stk.push(ch);
    }
  }
  return !stk.length;
};

// TODO 深层次设置key
Util.deepSet = function (data) {
  const addKey = (arr) =>
    arr.map((item) => ({
      ...item,
      children: item.children ? addKey(item.children) : [],
    }));
  return addKey(data);
}

// TODO 判断数据类型
Util.getDataType = function (value) {
  const toString = Object.prototype.toString
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]'
  }
  return toString.call(value);
}


// TODO 判断密码强度
Util.paCodeStrength = function (str) {
  let num = 0; // 数字
  let lowerCode = 0; //小写字母
  let upperCode = 0; //大写字母
  let special = 0; // 特殊字符
  for (let k = 0; k < str.length; k++) {
    // 字符的 Unicode 编码
    let C = str.charCodeAt(k);
    if (C >= 48 && C <= 57) {
      num++;
    } else if (C >= 65 && C <= 90) {
      upperCode++;
    } else if (C >= 97 && C <= 122) {
      lowerCode++;
    } else {
      special++;
    }
  }
  // console.log(num, lowerCode, upperCode, special);
  let arr = [num, lowerCode, upperCode, special];
  let strongStr = "";
  if (str.length < 8) {
    strongStr = "弱";
  } else if (str.length >= 8) {
    let counts = 0;
    arr.forEach((v, i) => {
      if (v != 0) {
        counts++;
      }
    });
    // console.log(counts);
    if (counts <= 2) {
      strongStr = "中";
    } else {
      strongStr = "强";
    }
  }
  return strongStr;
}

// TODO 唯一字符串
Util.UUID = function () {
  const temp_url = URL.createObjectURL(new Blob());
  const uuid = temp_url.toString()
  URL.revokeObjectURL(temp_url) //释放这个url
  return uuid.substring(uuid.lastIndexOf('/') + 1);
}

// TODO 不声明第三个变量，交换变量的值
Util.exchangeVal = function (arr) {
  // let Ta=1,Tb=2,Ta=[Tb,Tb=Ta][0]
  arr[1] = [arr[2], arr[2] = arr[1]][0]
  return [arr]
}

export default Util
