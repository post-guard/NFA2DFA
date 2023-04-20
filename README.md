# NFA2DFA
---
**此代码仅供参考，不提倡用于提交课程作业**

北京邮电大学《形式语言与自动机》2023级实验一 - NFA 转换成 DFA

---
采用`Vue`+`Electron`开发，适用于Windows/Linux/macOs三端系统

内部已集成`Graphviz`图形库，无需进行组件下载

---
## 使用预览
![](https://github.com/ZYL-DF/Pic_res/blob/main/_BX46LYZ%5B%404V%5B8WOY%25CJQOB.png)
![](https://github.com/ZYL-DF/Pic_res/blob/main/BDKYXSLW386%24T9O6O6FP%7D1K.png)

---
## 使用方法
* 程序已打包为zip压缩包的格式，在对应系统下解压对应压缩包，点击nfa2dfa-automatic-machine即可打开程序
* 进入程序后，NFA输入区下方提供NFA五要素的输入功能，用户可输入NFA的五要素进行初步状态的设置
* NFA上方的图像输出区提供根据下方输入生成的自动机图像，供用户校验输入正确性
* 按动中央的转换按钮后，程序会以子集构造法将NFA转换为DFA，将结果输出在右侧的DFA转换结果输出区，实现转换功能

