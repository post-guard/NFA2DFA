/**
 * 对形如q0，q1的字符串按逗号（中/英文）进行分词
 * @param String str 要进行分词的字符串
 * @return String[] 以字符串数组的方式返回已分词的各子串
 */
const deconcatenation = (str:string):string[]=>{


    return str.split(/,|，/);

}

const transferJson = (str:string[]):string=>{



    const options:any[] = [];

    for(const s of str){
        options.push({
            value:s,
            label:s
        })

    }


    return JSON.stringify(options);
}

export {
    deconcatenation,
    transferJson,
}