const Koa  = require('koa');
const app = new Koa();
app.use(async(ctx)=>{
    if(ctx.url==='/' && ctx.method==='GET'){
        //显示表单页面
        let html=`
            <h1>JSPang Koa2 request POST</h1>
            <form method="POST" action="/">
                <p>userName</p>
                <input name="userName" /><br/>
                <p>age</p>
                <input name="age" /><br/>
                <p>website</p>
                <input name="webSite" /><br/>
                <button type="submit">submit</button>
            </form>
        `;
        ctx.body=html;
    }else if(ctx.url==='/' && ctx.method==='POST'){
        let pastData=await parsePostData(ctx);
         ctx.body=pastData;
    }else{
        ctx.body='<h1>404!</h1>';
    }

});

function parsePostData(ctx){
    return new Promise((resolve,reject)=>{
        try{
            let postdata="";
             // on addListener都是监听事件，接收数据的功能*

​      // ctx.req.addListener是原生的*

​      //ctx.req.on是koa2提供的on*
            ctx.req.on('data',(data)=>{
                postdata += data
            })
            ctx.req.addListener("end",function(){
                let parseData = parseQueryStr( postdata )
                resolve(parseData);
            })
        }catch(error){
            reject(error);
        }
    });
}


function parseQueryStr(queryStr){
    let queryData={};
    // split('&')部分将输出结果从字符串变成了数组
​    //split('=') 以‘=’为基础再各分成三个数组
    let queryStrList = queryStr.split('&');
    console.log(queryStrList);
    //entries()方法返回一个数组的迭代对象*
    for( let [index,queryStr] of queryStrList.entries() ){
        let itemList = queryStr.split('=');
        console.log(itemList);
        queryData[itemList[0]] = decodeURIComponent(itemList[1]);
    } 
    return queryData
}

app.listen(3000,()=>{
    console.log('[demo] server is starting at port 3000');
});