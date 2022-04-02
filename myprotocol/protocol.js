const startSign=0xf;
const lenLimit=4;
const headLen=1+lenLimit;
var currentSeq=0;
//协议主要由两部分构成，起始标志和内容长度组成

//打包函数，将data封装好
function pack(data) {
    let head=Buffer.alloc(headLen),body=Buffer.from(data);
    head[0]=startSign;
    head.writeUIntBE(body.length,1,lenLimit);
    return Buffer.concat([head,body]);
}

//解包函数，将buffer与data连接后再尝试解包
//将buffer与data合并后进行解析分为开头不合法，数据包不全以及完整解包几种情况
function unpack(buffer,data) {
    let newBuf=Buffer.concat([buffer,data]),stpos=newBuf.indexOf(startSign);
    if(stpos<0) 
        return {
            package:Buffer(0),
            buffer:newBuf
        };
    else if(stpos>0) 
        newBuf=newBuf.slice(stpos);

    if(newBuf.length<=headLen) 
        return {
            package:Buffer(0),
            buffer:newBuf
        };
    
    let packLen=newBuf.readInt32BE(1);
    if(headLen+packLen>newBuf.length)
        return {
            package:Buffer(0),
            buffer:newBuf
        }
    return {
        package:newBuf.slice(headLen,headLen+packLen),
        buffer:newBuf.slice(headLen+packLen)
    }
}


module.exports={pack,unpack};