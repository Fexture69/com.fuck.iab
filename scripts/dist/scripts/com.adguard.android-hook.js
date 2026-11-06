(()=>{var Io=Object.defineProperty;var Fo=(t,e)=>{for(var n in e)Io(t,n,{get:e[n],enumerable:!0})};var Re=[],Le=[],rn="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for(let t=0,e=rn.length;t<e;++t)Re[t]=rn[t],Le[rn.charCodeAt(t)]=t;Le[45]=62;Le[95]=63;function Co(t){let e=t.length;if(e%4>0)throw new Error("Invalid string. Length must be a multiple of 4");let n=t.indexOf("=");n===-1&&(n=e);let r=n===e?0:4-n%4;return[n,r]}function Uo(t,e,n){return(e+n)*3/4-n}function Jr(t){let e=Co(t),n=e[0],r=e[1],s=new Uint8Array(Uo(t,n,r)),o=0,i=r>0?n-4:n,a;for(a=0;a<i;a+=4){let c=Le[t.charCodeAt(a)]<<18|Le[t.charCodeAt(a+1)]<<12|Le[t.charCodeAt(a+2)]<<6|Le[t.charCodeAt(a+3)];s[o++]=c>>16&255,s[o++]=c>>8&255,s[o++]=c&255}if(r===2){let c=Le[t.charCodeAt(a)]<<2|Le[t.charCodeAt(a+1)]>>4;s[o++]=c&255}if(r===1){let c=Le[t.charCodeAt(a)]<<10|Le[t.charCodeAt(a+1)]<<4|Le[t.charCodeAt(a+2)]>>2;s[o++]=c>>8&255,s[o++]=c&255}return s}function Do(t){return Re[t>>18&63]+Re[t>>12&63]+Re[t>>6&63]+Re[t&63]}function zo(t,e,n){let r=[];for(let s=e;s<n;s+=3){let o=(t[s]<<16&16711680)+(t[s+1]<<8&65280)+(t[s+2]&255);r.push(Do(o))}return r.join("")}function sn(t){let e=t.length,n=e%3,r=[],s=16383;for(let o=0,i=e-n;o<i;o+=s)r.push(zo(t,o,o+s>i?i:o+s));if(n===1){let o=t[e-1];r.push(Re[o>>2]+Re[o<<4&63]+"==")}else if(n===2){let o=(t[e-2]<<8)+t[e-1];r.push(Re[o>>10]+Re[o>>4&63]+Re[o<<2&63]+"=")}return r.join("")}function ut(t,e,n,r,s){let o,i,a=s*8-r-1,c=(1<<a)-1,l=c>>1,d=-7,f=n?s-1:0,h=n?-1:1,u=t[e+f];for(f+=h,o=u&(1<<-d)-1,u>>=-d,d+=a;d>0;)o=o*256+t[e+f],f+=h,d-=8;for(i=o&(1<<-d)-1,o>>=-d,d+=r;d>0;)i=i*256+t[e+f],f+=h,d-=8;if(o===0)o=1-l;else{if(o===c)return i?NaN:(u?-1:1)*(1/0);i=i+Math.pow(2,r),o=o-l}return(u?-1:1)*i*Math.pow(2,o-r)}function on(t,e,n,r,s,o){let i,a,c,l=o*8-s-1,d=(1<<l)-1,f=d>>1,h=s===23?Math.pow(2,-24)-Math.pow(2,-77):0,u=r?0:o-1,m=r?1:-1,p=e<0||e===0&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(a=isNaN(e)?1:0,i=d):(i=Math.floor(Math.log(e)/Math.LN2),e*(c=Math.pow(2,-i))<1&&(i--,c*=2),i+f>=1?e+=h/c:e+=h*Math.pow(2,1-f),e*c>=2&&(i++,c/=2),i+f>=d?(a=0,i=d):i+f>=1?(a=(e*c-1)*Math.pow(2,s),i=i+f):(a=e*Math.pow(2,f-1)*Math.pow(2,s),i=0));s>=8;)t[n+u]=a&255,u+=m,a/=256,s-=8;for(i=i<<s|a,l+=s;l>0;)t[n+u]=i&255,u+=m,i/=256,l-=8;t[n+u-m]|=p*128}var Bo={INSPECT_MAX_BYTES:50},an=2147483647;_.TYPED_ARRAY_SUPPORT=!0;Object.defineProperty(_.prototype,"parent",{enumerable:!0,get:function(){if(_.isBuffer(this))return this.buffer}});Object.defineProperty(_.prototype,"offset",{enumerable:!0,get:function(){if(_.isBuffer(this))return this.byteOffset}});function Ce(t){if(t>an)throw new RangeError('The value "'+t+'" is invalid for option "size"');let e=new Uint8Array(t);return Object.setPrototypeOf(e,_.prototype),e}function _(t,e,n){if(typeof t=="number"){if(typeof e=="string")throw new TypeError('The "string" argument must be of type string. Received type number');return un(t)}return Wr(t,e,n)}_.poolSize=8192;function Wr(t,e,n){if(typeof t=="string")return Jo(t,e);if(ArrayBuffer.isView(t))return Ho(t);if(t==null)throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t);if(t instanceof ArrayBuffer||t&&t.buffer instanceof ArrayBuffer||t instanceof SharedArrayBuffer||t&&t.buffer instanceof SharedArrayBuffer)return ln(t,e,n);if(typeof t=="number")throw new TypeError('The "value" argument must not be of type number. Received type number');let r=t.valueOf&&t.valueOf();if(r!=null&&r!==t)return _.from(r,e,n);let s=Zo(t);if(s)return s;if(typeof Symbol<"u"&&Symbol.toPrimitive!=null&&typeof t[Symbol.toPrimitive]=="function")return _.from(t[Symbol.toPrimitive]("string"),e,n);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t)}_.from=function(t,e,n){return Wr(t,e,n)};Object.setPrototypeOf(_.prototype,Uint8Array.prototype);Object.setPrototypeOf(_,Uint8Array);function Kr(t){if(typeof t!="number")throw new TypeError('"size" argument must be of type number');if(t<0)throw new RangeError('The value "'+t+'" is invalid for option "size"')}function $o(t,e,n){return Kr(t),t<=0?Ce(t):e!==void 0?typeof n=="string"?Ce(t).fill(e,n):Ce(t).fill(e):Ce(t)}_.alloc=function(t,e,n){return $o(t,e,n)};function un(t){return Kr(t),Ce(t<0?0:fn(t)|0)}_.allocUnsafe=function(t){return un(t)};_.allocUnsafeSlow=function(t){return un(t)};function Jo(t,e){if((typeof e!="string"||e==="")&&(e="utf8"),!_.isEncoding(e))throw new TypeError("Unknown encoding: "+e);let n=Yr(t,e)|0,r=Ce(n),s=r.write(t,e);return s!==n&&(r=r.slice(0,s)),r}function cn(t){let e=t.length<0?0:fn(t.length)|0,n=Ce(e);for(let r=0;r<e;r+=1)n[r]=t[r]&255;return n}function Ho(t){if(t instanceof Uint8Array){let e=new Uint8Array(t);return ln(e.buffer,e.byteOffset,e.byteLength)}return cn(t)}function ln(t,e,n){if(e<0||t.byteLength<e)throw new RangeError('"offset" is outside of buffer bounds');if(t.byteLength<e+(n||0))throw new RangeError('"length" is outside of buffer bounds');let r;return e===void 0&&n===void 0?r=new Uint8Array(t):n===void 0?r=new Uint8Array(t,e):r=new Uint8Array(t,e,n),Object.setPrototypeOf(r,_.prototype),r}function Zo(t){if(_.isBuffer(t)){let e=fn(t.length)|0,n=Ce(e);return n.length===0||t.copy(n,0,0,e),n}if(t.length!==void 0)return typeof t.length!="number"||Number.isNaN(t.length)?Ce(0):cn(t);if(t.type==="Buffer"&&Array.isArray(t.data))return cn(t.data)}function fn(t){if(t>=an)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+an.toString(16)+" bytes");return t|0}_.isBuffer=function(e){return e!=null&&e._isBuffer===!0&&e!==_.prototype};_.compare=function(e,n){if(e instanceof Uint8Array&&(e=_.from(e,e.offset,e.byteLength)),n instanceof Uint8Array&&(n=_.from(n,n.offset,n.byteLength)),!_.isBuffer(e)||!_.isBuffer(n))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(e===n)return 0;let r=e.length,s=n.length;for(let o=0,i=Math.min(r,s);o<i;++o)if(e[o]!==n[o]){r=e[o],s=n[o];break}return r<s?-1:s<r?1:0};_.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}};_.concat=function(e,n){if(!Array.isArray(e))throw new TypeError('"list" argument must be an Array of Buffers');if(e.length===0)return _.alloc(0);let r;if(n===void 0)for(n=0,r=0;r<e.length;++r)n+=e[r].length;let s=_.allocUnsafe(n),o=0;for(r=0;r<e.length;++r){let i=e[r];if(i instanceof Uint8Array)o+i.length>s.length?(_.isBuffer(i)||(i=_.from(i.buffer,i.byteOffset,i.byteLength)),i.copy(s,o)):Uint8Array.prototype.set.call(s,i,o);else if(_.isBuffer(i))i.copy(s,o);else throw new TypeError('"list" argument must be an Array of Buffers');o+=i.length}return s};function Yr(t,e){if(_.isBuffer(t))return t.length;if(ArrayBuffer.isView(t)||t instanceof ArrayBuffer)return t.byteLength;if(typeof t!="string")throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof t);let n=t.length,r=arguments.length>2&&arguments[2]===!0;if(!r&&n===0)return 0;let s=!1;for(;;)switch(e){case"ascii":case"latin1":case"binary":return n;case"utf8":case"utf-8":return dn(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return n*2;case"hex":return n>>>1;case"base64":return is(t).length;default:if(s)return r?-1:dn(t).length;e=(""+e).toLowerCase(),s=!0}}_.byteLength=Yr;function qo(t,e,n){let r=!1;if((e===void 0||e<0)&&(e=0),e>this.length||((n===void 0||n>this.length)&&(n=this.length),n<=0)||(n>>>=0,e>>>=0,n<=e))return"";for(t||(t="utf8");;)switch(t){case"hex":return si(this,e,n);case"utf8":case"utf-8":return Xr(this,e,n);case"ascii":return ni(this,e,n);case"latin1":case"binary":return ri(this,e,n);case"base64":return ei(this,e,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return oi(this,e,n);default:if(r)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),r=!0}}_.prototype._isBuffer=!0;function Je(t,e,n){let r=t[e];t[e]=t[n],t[n]=r}_.prototype.swap16=function(){let e=this.length;if(e%2!==0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(let n=0;n<e;n+=2)Je(this,n,n+1);return this};_.prototype.swap32=function(){let e=this.length;if(e%4!==0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(let n=0;n<e;n+=4)Je(this,n,n+3),Je(this,n+1,n+2);return this};_.prototype.swap64=function(){let e=this.length;if(e%8!==0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(let n=0;n<e;n+=8)Je(this,n,n+7),Je(this,n+1,n+6),Je(this,n+2,n+5),Je(this,n+3,n+4);return this};_.prototype.toString=function(){let e=this.length;return e===0?"":arguments.length===0?Xr(this,0,e):qo.apply(this,arguments)};_.prototype.toLocaleString=_.prototype.toString;_.prototype.equals=function(e){if(!_.isBuffer(e))throw new TypeError("Argument must be a Buffer");return this===e?!0:_.compare(this,e)===0};_.prototype.inspect=function(){let e="",n=Bo.INSPECT_MAX_BYTES;return e=this.toString("hex",0,n).replace(/(.{2})/g,"$1 ").trim(),this.length>n&&(e+=" ... "),"<Buffer "+e+">"};_.prototype[Symbol.for("nodejs.util.inspect.custom")]=_.prototype.inspect;_.prototype.compare=function(e,n,r,s,o){if(e instanceof Uint8Array&&(e=_.from(e,e.offset,e.byteLength)),!_.isBuffer(e))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof e);if(n===void 0&&(n=0),r===void 0&&(r=e?e.length:0),s===void 0&&(s=0),o===void 0&&(o=this.length),n<0||r>e.length||s<0||o>this.length)throw new RangeError("out of range index");if(s>=o&&n>=r)return 0;if(s>=o)return-1;if(n>=r)return 1;if(n>>>=0,r>>>=0,s>>>=0,o>>>=0,this===e)return 0;let i=o-s,a=r-n,c=Math.min(i,a),l=this.slice(s,o),d=e.slice(n,r);for(let f=0;f<c;++f)if(l[f]!==d[f]){i=l[f],a=d[f];break}return i<a?-1:a<i?1:0};function Qr(t,e,n,r,s){if(t.length===0)return-1;if(typeof n=="string"?(r=n,n=0):n>2147483647?n=2147483647:n<-2147483648&&(n=-2147483648),n=+n,Number.isNaN(n)&&(n=s?0:t.length-1),n<0&&(n=t.length+n),n>=t.length){if(s)return-1;n=t.length-1}else if(n<0)if(s)n=0;else return-1;if(typeof e=="string"&&(e=_.from(e,r)),_.isBuffer(e))return e.length===0?-1:Hr(t,e,n,r,s);if(typeof e=="number")return e=e&255,typeof Uint8Array.prototype.indexOf=="function"?s?Uint8Array.prototype.indexOf.call(t,e,n):Uint8Array.prototype.lastIndexOf.call(t,e,n):Hr(t,[e],n,r,s);throw new TypeError("val must be string, number or Buffer")}function Hr(t,e,n,r,s){let o=1,i=t.length,a=e.length;if(r!==void 0&&(r=String(r).toLowerCase(),r==="ucs2"||r==="ucs-2"||r==="utf16le"||r==="utf-16le")){if(t.length<2||e.length<2)return-1;o=2,i/=2,a/=2,n/=2}function c(d,f){return o===1?d[f]:d.readUInt16BE(f*o)}let l;if(s){let d=-1;for(l=n;l<i;l++)if(c(t,l)===c(e,d===-1?0:l-d)){if(d===-1&&(d=l),l-d+1===a)return d*o}else d!==-1&&(l-=l-d),d=-1}else for(n+a>i&&(n=i-a),l=n;l>=0;l--){let d=!0;for(let f=0;f<a;f++)if(c(t,l+f)!==c(e,f)){d=!1;break}if(d)return l}return-1}_.prototype.includes=function(e,n,r){return this.indexOf(e,n,r)!==-1};_.prototype.indexOf=function(e,n,r){return Qr(this,e,n,r,!0)};_.prototype.lastIndexOf=function(e,n,r){return Qr(this,e,n,r,!1)};function Wo(t,e,n,r){n=Number(n)||0;let s=t.length-n;r?(r=Number(r),r>s&&(r=s)):r=s;let o=e.length;r>o/2&&(r=o/2);let i;for(i=0;i<r;++i){let a=parseInt(e.substr(i*2,2),16);if(Number.isNaN(a))return i;t[n+i]=a}return i}function Ko(t,e,n,r){return Ot(dn(e,t.length-n),t,n,r)}function Yo(t,e,n,r){return Ot(li(e),t,n,r)}function Qo(t,e,n,r){return Ot(is(e),t,n,r)}function Xo(t,e,n,r){return Ot(di(e,t.length-n),t,n,r)}_.prototype.write=function(e,n,r,s){if(n===void 0)s="utf8",r=this.length,n=0;else if(r===void 0&&typeof n=="string")s=n,r=this.length,n=0;else if(isFinite(n))n=n>>>0,isFinite(r)?(r=r>>>0,s===void 0&&(s="utf8")):(s=r,r=void 0);else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");let o=this.length-n;if((r===void 0||r>o)&&(r=o),e.length>0&&(r<0||n<0)||n>this.length)throw new RangeError("Attempt to write outside buffer bounds");s||(s="utf8");let i=!1;for(;;)switch(s){case"hex":return Wo(this,e,n,r);case"utf8":case"utf-8":return Ko(this,e,n,r);case"ascii":case"latin1":case"binary":return Yo(this,e,n,r);case"base64":return Qo(this,e,n,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return Xo(this,e,n,r);default:if(i)throw new TypeError("Unknown encoding: "+s);s=(""+s).toLowerCase(),i=!0}};_.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};function ei(t,e,n){return e===0&&n===t.length?sn(t):sn(t.slice(e,n))}function Xr(t,e,n){n=Math.min(t.length,n);let r=[],s=e;for(;s<n;){let o=t[s],i=null,a=o>239?4:o>223?3:o>191?2:1;if(s+a<=n){let c,l,d,f;switch(a){case 1:o<128&&(i=o);break;case 2:c=t[s+1],(c&192)===128&&(f=(o&31)<<6|c&63,f>127&&(i=f));break;case 3:c=t[s+1],l=t[s+2],(c&192)===128&&(l&192)===128&&(f=(o&15)<<12|(c&63)<<6|l&63,f>2047&&(f<55296||f>57343)&&(i=f));break;case 4:c=t[s+1],l=t[s+2],d=t[s+3],(c&192)===128&&(l&192)===128&&(d&192)===128&&(f=(o&15)<<18|(c&63)<<12|(l&63)<<6|d&63,f>65535&&f<1114112&&(i=f))}}i===null?(i=65533,a=1):i>65535&&(i-=65536,r.push(i>>>10&1023|55296),i=56320|i&1023),r.push(i),s+=a}return ti(r)}var Zr=4096;function ti(t){let e=t.length;if(e<=Zr)return String.fromCharCode.apply(String,t);let n="",r=0;for(;r<e;)n+=String.fromCharCode.apply(String,t.slice(r,r+=Zr));return n}function ni(t,e,n){let r="";n=Math.min(t.length,n);for(let s=e;s<n;++s)r+=String.fromCharCode(t[s]&127);return r}function ri(t,e,n){let r="";n=Math.min(t.length,n);for(let s=e;s<n;++s)r+=String.fromCharCode(t[s]);return r}function si(t,e,n){let r=t.length;(!e||e<0)&&(e=0),(!n||n<0||n>r)&&(n=r);let s="";for(let o=e;o<n;++o)s+=ui[t[o]];return s}function oi(t,e,n){let r=t.slice(e,n),s="";for(let o=0;o<r.length-1;o+=2)s+=String.fromCharCode(r[o]+r[o+1]*256);return s}_.prototype.slice=function(e,n){let r=this.length;e=~~e,n=n===void 0?r:~~n,e<0?(e+=r,e<0&&(e=0)):e>r&&(e=r),n<0?(n+=r,n<0&&(n=0)):n>r&&(n=r),n<e&&(n=e);let s=this.subarray(e,n);return Object.setPrototypeOf(s,_.prototype),s};function pe(t,e,n){if(t%1!==0||t<0)throw new RangeError("offset is not uint");if(t+e>n)throw new RangeError("Trying to access beyond buffer length")}_.prototype.readUintLE=_.prototype.readUIntLE=function(e,n,r){e=e>>>0,n=n>>>0,r||pe(e,n,this.length);let s=this[e],o=1,i=0;for(;++i<n&&(o*=256);)s+=this[e+i]*o;return s};_.prototype.readUintBE=_.prototype.readUIntBE=function(e,n,r){e=e>>>0,n=n>>>0,r||pe(e,n,this.length);let s=this[e+--n],o=1;for(;n>0&&(o*=256);)s+=this[e+--n]*o;return s};_.prototype.readUint8=_.prototype.readUInt8=function(e,n){return e=e>>>0,n||pe(e,1,this.length),this[e]};_.prototype.readUint16LE=_.prototype.readUInt16LE=function(e,n){return e=e>>>0,n||pe(e,2,this.length),this[e]|this[e+1]<<8};_.prototype.readUint16BE=_.prototype.readUInt16BE=function(e,n){return e=e>>>0,n||pe(e,2,this.length),this[e]<<8|this[e+1]};_.prototype.readUint32LE=_.prototype.readUInt32LE=function(e,n){return e=e>>>0,n||pe(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+this[e+3]*16777216};_.prototype.readUint32BE=_.prototype.readUInt32BE=function(e,n){return e=e>>>0,n||pe(e,4,this.length),this[e]*16777216+(this[e+1]<<16|this[e+2]<<8|this[e+3])};_.prototype.readBigUInt64LE=function(e){e=e>>>0,et(e,"offset");let n=this[e],r=this[e+7];(n===void 0||r===void 0)&&ft(e,this.length-8);let s=n+this[++e]*2**8+this[++e]*2**16+this[++e]*2**24,o=this[++e]+this[++e]*2**8+this[++e]*2**16+r*2**24;return BigInt(s)+(BigInt(o)<<BigInt(32))};_.prototype.readBigUInt64BE=function(e){e=e>>>0,et(e,"offset");let n=this[e],r=this[e+7];(n===void 0||r===void 0)&&ft(e,this.length-8);let s=n*2**24+this[++e]*2**16+this[++e]*2**8+this[++e],o=this[++e]*2**24+this[++e]*2**16+this[++e]*2**8+r;return(BigInt(s)<<BigInt(32))+BigInt(o)};_.prototype.readIntLE=function(e,n,r){e=e>>>0,n=n>>>0,r||pe(e,n,this.length);let s=this[e],o=1,i=0;for(;++i<n&&(o*=256);)s+=this[e+i]*o;return o*=128,s>=o&&(s-=Math.pow(2,8*n)),s};_.prototype.readIntBE=function(e,n,r){e=e>>>0,n=n>>>0,r||pe(e,n,this.length);let s=n,o=1,i=this[e+--s];for(;s>0&&(o*=256);)i+=this[e+--s]*o;return o*=128,i>=o&&(i-=Math.pow(2,8*n)),i};_.prototype.readInt8=function(e,n){return e=e>>>0,n||pe(e,1,this.length),this[e]&128?(255-this[e]+1)*-1:this[e]};_.prototype.readInt16LE=function(e,n){e=e>>>0,n||pe(e,2,this.length);let r=this[e]|this[e+1]<<8;return r&32768?r|4294901760:r};_.prototype.readInt16BE=function(e,n){e=e>>>0,n||pe(e,2,this.length);let r=this[e+1]|this[e]<<8;return r&32768?r|4294901760:r};_.prototype.readInt32LE=function(e,n){return e=e>>>0,n||pe(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24};_.prototype.readInt32BE=function(e,n){return e=e>>>0,n||pe(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]};_.prototype.readBigInt64LE=function(e){e=e>>>0,et(e,"offset");let n=this[e],r=this[e+7];(n===void 0||r===void 0)&&ft(e,this.length-8);let s=this[e+4]+this[e+5]*2**8+this[e+6]*2**16+(r<<24);return(BigInt(s)<<BigInt(32))+BigInt(n+this[++e]*2**8+this[++e]*2**16+this[++e]*2**24)};_.prototype.readBigInt64BE=function(e){e=e>>>0,et(e,"offset");let n=this[e],r=this[e+7];(n===void 0||r===void 0)&&ft(e,this.length-8);let s=(n<<24)+this[++e]*2**16+this[++e]*2**8+this[++e];return(BigInt(s)<<BigInt(32))+BigInt(this[++e]*2**24+this[++e]*2**16+this[++e]*2**8+r)};_.prototype.readFloatLE=function(e,n){return e=e>>>0,n||pe(e,4,this.length),ut(this,e,!0,23,4)};_.prototype.readFloatBE=function(e,n){return e=e>>>0,n||pe(e,4,this.length),ut(this,e,!1,23,4)};_.prototype.readDoubleLE=function(e,n){return e=e>>>0,n||pe(e,8,this.length),ut(this,e,!0,52,8)};_.prototype.readDoubleBE=function(e,n){return e=e>>>0,n||pe(e,8,this.length),ut(this,e,!1,52,8)};function Se(t,e,n,r,s,o){if(!_.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(e>s||e<o)throw new RangeError('"value" argument is out of bounds');if(n+r>t.length)throw new RangeError("Index out of range")}_.prototype.writeUintLE=_.prototype.writeUIntLE=function(e,n,r,s){if(e=+e,n=n>>>0,r=r>>>0,!s){let a=Math.pow(2,8*r)-1;Se(this,e,n,r,a,0)}let o=1,i=0;for(this[n]=e&255;++i<r&&(o*=256);)this[n+i]=e/o&255;return n+r};_.prototype.writeUintBE=_.prototype.writeUIntBE=function(e,n,r,s){if(e=+e,n=n>>>0,r=r>>>0,!s){let a=Math.pow(2,8*r)-1;Se(this,e,n,r,a,0)}let o=r-1,i=1;for(this[n+o]=e&255;--o>=0&&(i*=256);)this[n+o]=e/i&255;return n+r};_.prototype.writeUint8=_.prototype.writeUInt8=function(e,n,r){return e=+e,n=n>>>0,r||Se(this,e,n,1,255,0),this[n]=e&255,n+1};_.prototype.writeUint16LE=_.prototype.writeUInt16LE=function(e,n,r){return e=+e,n=n>>>0,r||Se(this,e,n,2,65535,0),this[n]=e&255,this[n+1]=e>>>8,n+2};_.prototype.writeUint16BE=_.prototype.writeUInt16BE=function(e,n,r){return e=+e,n=n>>>0,r||Se(this,e,n,2,65535,0),this[n]=e>>>8,this[n+1]=e&255,n+2};_.prototype.writeUint32LE=_.prototype.writeUInt32LE=function(e,n,r){return e=+e,n=n>>>0,r||Se(this,e,n,4,4294967295,0),this[n+3]=e>>>24,this[n+2]=e>>>16,this[n+1]=e>>>8,this[n]=e&255,n+4};_.prototype.writeUint32BE=_.prototype.writeUInt32BE=function(e,n,r){return e=+e,n=n>>>0,r||Se(this,e,n,4,4294967295,0),this[n]=e>>>24,this[n+1]=e>>>16,this[n+2]=e>>>8,this[n+3]=e&255,n+4};function es(t,e,n,r,s){os(e,r,s,t,n,7);let o=Number(e&BigInt(4294967295));t[n++]=o,o=o>>8,t[n++]=o,o=o>>8,t[n++]=o,o=o>>8,t[n++]=o;let i=Number(e>>BigInt(32)&BigInt(4294967295));return t[n++]=i,i=i>>8,t[n++]=i,i=i>>8,t[n++]=i,i=i>>8,t[n++]=i,n}function ts(t,e,n,r,s){os(e,r,s,t,n,7);let o=Number(e&BigInt(4294967295));t[n+7]=o,o=o>>8,t[n+6]=o,o=o>>8,t[n+5]=o,o=o>>8,t[n+4]=o;let i=Number(e>>BigInt(32)&BigInt(4294967295));return t[n+3]=i,i=i>>8,t[n+2]=i,i=i>>8,t[n+1]=i,i=i>>8,t[n]=i,n+8}_.prototype.writeBigUInt64LE=function(e,n=0){return es(this,e,n,BigInt(0),BigInt("0xffffffffffffffff"))};_.prototype.writeBigUInt64BE=function(e,n=0){return ts(this,e,n,BigInt(0),BigInt("0xffffffffffffffff"))};_.prototype.writeIntLE=function(e,n,r,s){if(e=+e,n=n>>>0,!s){let c=Math.pow(2,8*r-1);Se(this,e,n,r,c-1,-c)}let o=0,i=1,a=0;for(this[n]=e&255;++o<r&&(i*=256);)e<0&&a===0&&this[n+o-1]!==0&&(a=1),this[n+o]=(e/i>>0)-a&255;return n+r};_.prototype.writeIntBE=function(e,n,r,s){if(e=+e,n=n>>>0,!s){let c=Math.pow(2,8*r-1);Se(this,e,n,r,c-1,-c)}let o=r-1,i=1,a=0;for(this[n+o]=e&255;--o>=0&&(i*=256);)e<0&&a===0&&this[n+o+1]!==0&&(a=1),this[n+o]=(e/i>>0)-a&255;return n+r};_.prototype.writeInt8=function(e,n,r){return e=+e,n=n>>>0,r||Se(this,e,n,1,127,-128),e<0&&(e=255+e+1),this[n]=e&255,n+1};_.prototype.writeInt16LE=function(e,n,r){return e=+e,n=n>>>0,r||Se(this,e,n,2,32767,-32768),this[n]=e&255,this[n+1]=e>>>8,n+2};_.prototype.writeInt16BE=function(e,n,r){return e=+e,n=n>>>0,r||Se(this,e,n,2,32767,-32768),this[n]=e>>>8,this[n+1]=e&255,n+2};_.prototype.writeInt32LE=function(e,n,r){return e=+e,n=n>>>0,r||Se(this,e,n,4,2147483647,-2147483648),this[n]=e&255,this[n+1]=e>>>8,this[n+2]=e>>>16,this[n+3]=e>>>24,n+4};_.prototype.writeInt32BE=function(e,n,r){return e=+e,n=n>>>0,r||Se(this,e,n,4,2147483647,-2147483648),e<0&&(e=4294967295+e+1),this[n]=e>>>24,this[n+1]=e>>>16,this[n+2]=e>>>8,this[n+3]=e&255,n+4};_.prototype.writeBigInt64LE=function(e,n=0){return es(this,e,n,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))};_.prototype.writeBigInt64BE=function(e,n=0){return ts(this,e,n,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))};function ns(t,e,n,r,s,o){if(n+r>t.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("Index out of range")}function rs(t,e,n,r,s){return e=+e,n=n>>>0,s||ns(t,e,n,4,34028234663852886e22,-34028234663852886e22),on(t,e,n,r,23,4),n+4}_.prototype.writeFloatLE=function(e,n,r){return rs(this,e,n,!0,r)};_.prototype.writeFloatBE=function(e,n,r){return rs(this,e,n,!1,r)};function ss(t,e,n,r,s){return e=+e,n=n>>>0,s||ns(t,e,n,8,17976931348623157e292,-17976931348623157e292),on(t,e,n,r,52,8),n+8}_.prototype.writeDoubleLE=function(e,n,r){return ss(this,e,n,!0,r)};_.prototype.writeDoubleBE=function(e,n,r){return ss(this,e,n,!1,r)};_.prototype.copy=function(e,n,r,s){if(!_.isBuffer(e))throw new TypeError("argument should be a Buffer");if(r||(r=0),!s&&s!==0&&(s=this.length),n>=e.length&&(n=e.length),n||(n=0),s>0&&s<r&&(s=r),s===r||e.length===0||this.length===0)return 0;if(n<0)throw new RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw new RangeError("Index out of range");if(s<0)throw new RangeError("sourceEnd out of bounds");s>this.length&&(s=this.length),e.length-n<s-r&&(s=e.length-n+r);let o=s-r;return this===e?this.copyWithin(n,r,s):Uint8Array.prototype.set.call(e,this.subarray(r,s),n),o};_.prototype.fill=function(e,n,r,s){if(typeof e=="string"){if(typeof n=="string"?(s=n,n=0,r=this.length):typeof r=="string"&&(s=r,r=this.length),s!==void 0&&typeof s!="string")throw new TypeError("encoding must be a string");if(typeof s=="string"&&!_.isEncoding(s))throw new TypeError("Unknown encoding: "+s);if(e.length===1){let i=e.charCodeAt(0);(s==="utf8"&&i<128||s==="latin1")&&(e=i)}}else typeof e=="number"?e=e&255:typeof e=="boolean"&&(e=Number(e));if(n<0||this.length<n||this.length<r)throw new RangeError("Out of range index");if(r<=n)return this;n=n>>>0,r=r===void 0?this.length:r>>>0,e||(e=0);let o;if(typeof e=="number")for(o=n;o<r;++o)this[o]=e;else{let i=_.isBuffer(e)?e:_.from(e,s),a=i.length;if(a===0)throw new TypeError('The value "'+e+'" is invalid for argument "value"');for(o=0;o<r-n;++o)this[o+n]=i[o%a]}return this};var Xe={};function hn(t,e,n){Xe[t]=class extends n{constructor(){super(),Object.defineProperty(this,"message",{value:e.apply(this,arguments),writable:!0,configurable:!0}),this.name=`${this.name} [${t}]`,this.stack,delete this.name}get code(){return t}set code(s){Object.defineProperty(this,"code",{configurable:!0,enumerable:!0,value:s,writable:!0})}toString(){return`${this.name} [${t}]: ${this.message}`}}}hn("ERR_BUFFER_OUT_OF_BOUNDS",function(t){return t?`${t} is outside of buffer bounds`:"Attempt to access memory outside buffer bounds"},RangeError);hn("ERR_INVALID_ARG_TYPE",function(t,e){return`The "${t}" argument must be of type number. Received type ${typeof e}`},TypeError);hn("ERR_OUT_OF_RANGE",function(t,e,n){let r=`The value of "${t}" is out of range.`,s=n;return Number.isInteger(n)&&Math.abs(n)>2**32?s=qr(String(n)):typeof n=="bigint"&&(s=String(n),(n>BigInt(2)**BigInt(32)||n<-(BigInt(2)**BigInt(32)))&&(s=qr(s)),s+="n"),r+=` It must be ${e}. Received ${s}`,r},RangeError);function qr(t){let e="",n=t.length,r=t[0]==="-"?1:0;for(;n>=r+4;n-=3)e=`_${t.slice(n-3,n)}${e}`;return`${t.slice(0,n)}${e}`}function ii(t,e,n){et(e,"offset"),(t[e]===void 0||t[e+n]===void 0)&&ft(e,t.length-(n+1))}function os(t,e,n,r,s,o){if(t>n||t<e){let i=typeof e=="bigint"?"n":"",a;throw o>3?e===0||e===BigInt(0)?a=`>= 0${i} and < 2${i} ** ${(o+1)*8}${i}`:a=`>= -(2${i} ** ${(o+1)*8-1}${i}) and < 2 ** ${(o+1)*8-1}${i}`:a=`>= ${e}${i} and <= ${n}${i}`,new Xe.ERR_OUT_OF_RANGE("value",a,t)}ii(r,s,o)}function et(t,e){if(typeof t!="number")throw new Xe.ERR_INVALID_ARG_TYPE(e,"number",t)}function ft(t,e,n){throw Math.floor(t)!==t?(et(t,n),new Xe.ERR_OUT_OF_RANGE(n||"offset","an integer",t)):e<0?new Xe.ERR_BUFFER_OUT_OF_BOUNDS:new Xe.ERR_OUT_OF_RANGE(n||"offset",`>= ${n?1:0} and <= ${e}`,t)}var ai=/[^+/0-9A-Za-z-_]/g;function ci(t){if(t=t.split("=")[0],t=t.trim().replace(ai,""),t.length<2)return"";for(;t.length%4!==0;)t=t+"=";return t}function dn(t,e){e=e||1/0;let n,r=t.length,s=null,o=[];for(let i=0;i<r;++i){if(n=t.charCodeAt(i),n>55295&&n<57344){if(!s){if(n>56319){(e-=3)>-1&&o.push(239,191,189);continue}else if(i+1===r){(e-=3)>-1&&o.push(239,191,189);continue}s=n;continue}if(n<56320){(e-=3)>-1&&o.push(239,191,189),s=n;continue}n=(s-55296<<10|n-56320)+65536}else s&&(e-=3)>-1&&o.push(239,191,189);if(s=null,n<128){if((e-=1)<0)break;o.push(n)}else if(n<2048){if((e-=2)<0)break;o.push(n>>6|192,n&63|128)}else if(n<65536){if((e-=3)<0)break;o.push(n>>12|224,n>>6&63|128,n&63|128)}else if(n<1114112){if((e-=4)<0)break;o.push(n>>18|240,n>>12&63|128,n>>6&63|128,n&63|128)}else throw new Error("Invalid code point")}return o}function li(t){let e=[];for(let n=0;n<t.length;++n)e.push(t.charCodeAt(n)&255);return e}function di(t,e){let n,r,s,o=[];for(let i=0;i<t.length&&!((e-=2)<0);++i)n=t.charCodeAt(i),r=n>>8,s=n%256,o.push(s),o.push(r);return o}function is(t){return Jr(ci(t))}function Ot(t,e,n,r){let s;for(s=0;s<r&&!(s+n>=e.length||s>=t.length);++s)e[s+n]=t[s];return s}var ui=function(){let t="0123456789abcdef",e=new Array(256);for(let n=0;n<16;++n){let r=n*16;for(let s=0;s<16;++s)e[r+s]=t[n]+t[s]}return e}();var w=function(t,e,n,r){var s=arguments.length,o=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,n):r,i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(o=(s<3?i(o):s>3?i(e,n,o):i(e,n))||o);return s>3&&o&&Object.defineProperty(e,n,o),o},A;(function(t){t.application={get dataPath(){return e("get_persistentDataPath")},get identifier(){return e("get_identifier")??e("get_bundleIdentifier")??Process.mainModule.name},get version(){return e("get_version")??t.module.enumerateSections().reduce((n,r)=>[".text","__text"].includes(r.name)?n.update(ArrayBuffer.wrap(r.address,r.size)):n,new Checksum("md5")).getString()}},ve(t,"unityVersion",()=>{try{let r=t.$config.unityVersion??e("get_unityVersion");if(r!=null)return r}catch{}let n=function*(){yield*t.module.enumerateSections().filter(r=>r.name==".rodata"||r.name==".rdata"||r.name=="__TEXT").map(r=>({base:r.address,size:r.size})),yield*t.module.enumerateRanges("r--"),yield*Process.enumerateRanges("r--").filter(r=>r.file!=null&&r.file.path!=t.module.path)};for(let r of n()){let s;try{s=Memory.scanSync(r.base,r.size,"69 6c 32 63 70 70")}catch{continue}for(let{address:o}of s){for(;o.readU8()!=0;)o=o.sub(1);let i=_n.find(o.add(1).readCString());if(i!=null)return i}}D("couldn't determine the Unity version, please specify it manually")},S);function e(n){let r=t.exports.resolveInternalCall(Memory.allocUtf8String("UnityEngine.Application::"+n));return(r.isNull()?t.domain.tryAssembly("UnityEngine.CoreModule")?.image?.tryClass("UnityEngine.Application")?.tryMethod(n)?.invoke():new t.String(new NativeFunction(r,"pointer",[])()))?.asNullable()?.content??null}})(A||(A={}));var A;(function(t){function e(n,r){let s={int8:"System.SByte",uint8:"System.Byte",int16:"System.Int16",uint16:"System.UInt16",int32:"System.Int32",uint32:"System.UInt32",int64:"System.Int64",uint64:"System.UInt64",char:"System.Char",intptr:"System.IntPtr",uintptr:"System.UIntPtr"},o=typeof n=="boolean"?"System.Boolean":typeof n=="number"?s[r??"int32"]:n instanceof Int64?"System.Int64":n instanceof UInt64?"System.UInt64":n instanceof NativePointer?s[r??"intptr"]:D(`Cannot create boxed primitive using value of type '${typeof n}'`),i=t.corlib.class(o??D(`Unknown primitive type name '${r}'`)).alloc();return(i.tryField("m_value")??i.tryField("_pointer")??D(`Could not find primitive field in class '${o}'`)).value=n,i}t.boxed=e})(A||(A={}));var A;(function(t){t.$config={moduleName:void 0,unityVersion:void 0,exports:void 0}})(A||(A={}));var A;(function(t){function e(n="current"){let r=t.exports.threadGetCurrent();return Interceptor.attach(t.module.getExportByName("__cxa_throw"),function(s){n=="current"&&!t.exports.threadGetCurrent().equals(r)||mn(new t.Object(s[0].readPointer()))})}t.installExceptionListener=e})(A||(A={}));var A;(function(t){t.exports={get alloc(){return e("il2cpp_alloc","pointer",["size_t"])},get arrayGetLength(){return e("il2cpp_array_length","uint32",["pointer"])},get arrayNew(){return e("il2cpp_array_new","pointer",["pointer","uint32"])},get assemblyGetImage(){return e("il2cpp_assembly_get_image","pointer",["pointer"])},get classForEach(){return e("il2cpp_class_for_each","void",["pointer","pointer"])},get classFromName(){return e("il2cpp_class_from_name","pointer",["pointer","pointer","pointer"])},get classFromObject(){return e("il2cpp_class_from_system_type","pointer",["pointer"])},get classGetArrayClass(){return e("il2cpp_array_class_get","pointer",["pointer","uint32"])},get classGetArrayElementSize(){return e("il2cpp_class_array_element_size","int",["pointer"])},get classGetAssemblyName(){return e("il2cpp_class_get_assemblyname","pointer",["pointer"])},get classGetBaseType(){return e("il2cpp_class_enum_basetype","pointer",["pointer"])},get classGetDeclaringType(){return e("il2cpp_class_get_declaring_type","pointer",["pointer"])},get classGetElementClass(){return e("il2cpp_class_get_element_class","pointer",["pointer"])},get classGetFieldFromName(){return e("il2cpp_class_get_field_from_name","pointer",["pointer","pointer"])},get classGetFields(){return e("il2cpp_class_get_fields","pointer",["pointer","pointer"])},get classGetFlags(){return e("il2cpp_class_get_flags","int",["pointer"])},get classGetImage(){return e("il2cpp_class_get_image","pointer",["pointer"])},get classGetInstanceSize(){return e("il2cpp_class_instance_size","int32",["pointer"])},get classGetInterfaces(){return e("il2cpp_class_get_interfaces","pointer",["pointer","pointer"])},get classGetMethodFromName(){return e("il2cpp_class_get_method_from_name","pointer",["pointer","pointer","int"])},get classGetMethods(){return e("il2cpp_class_get_methods","pointer",["pointer","pointer"])},get classGetName(){return e("il2cpp_class_get_name","pointer",["pointer"])},get classGetNamespace(){return e("il2cpp_class_get_namespace","pointer",["pointer"])},get classGetNestedClasses(){return e("il2cpp_class_get_nested_types","pointer",["pointer","pointer"])},get classGetParent(){return e("il2cpp_class_get_parent","pointer",["pointer"])},get classGetStaticFieldData(){return e("il2cpp_class_get_static_field_data","pointer",["pointer"])},get classGetValueTypeSize(){return e("il2cpp_class_value_size","int32",["pointer","pointer"])},get classGetType(){return e("il2cpp_class_get_type","pointer",["pointer"])},get classHasReferences(){return e("il2cpp_class_has_references","bool",["pointer"])},get classInitialize(){return e("il2cpp_runtime_class_init","void",["pointer"])},get classIsAbstract(){return e("il2cpp_class_is_abstract","bool",["pointer"])},get classIsAssignableFrom(){return e("il2cpp_class_is_assignable_from","bool",["pointer","pointer"])},get classIsBlittable(){return e("il2cpp_class_is_blittable","bool",["pointer"])},get classIsEnum(){return e("il2cpp_class_is_enum","bool",["pointer"])},get classIsGeneric(){return e("il2cpp_class_is_generic","bool",["pointer"])},get classIsInflated(){return e("il2cpp_class_is_inflated","bool",["pointer"])},get classIsInterface(){return e("il2cpp_class_is_interface","bool",["pointer"])},get classIsSubclassOf(){return e("il2cpp_class_is_subclass_of","bool",["pointer","pointer","bool"])},get classIsValueType(){return e("il2cpp_class_is_valuetype","bool",["pointer"])},get domainGetAssemblyFromName(){return e("il2cpp_domain_assembly_open","pointer",["pointer","pointer"])},get domainGet(){return e("il2cpp_domain_get","pointer",[])},get domainGetAssemblies(){return e("il2cpp_domain_get_assemblies","pointer",["pointer","pointer"])},get fieldGetClass(){return e("il2cpp_field_get_parent","pointer",["pointer"])},get fieldGetFlags(){return e("il2cpp_field_get_flags","int",["pointer"])},get fieldGetName(){return e("il2cpp_field_get_name","pointer",["pointer"])},get fieldGetOffset(){return e("il2cpp_field_get_offset","int32",["pointer"])},get fieldGetStaticValue(){return e("il2cpp_field_static_get_value","void",["pointer","pointer"])},get fieldGetType(){return e("il2cpp_field_get_type","pointer",["pointer"])},get fieldSetStaticValue(){return e("il2cpp_field_static_set_value","void",["pointer","pointer"])},get free(){return e("il2cpp_free","void",["pointer"])},get gcCollect(){return e("il2cpp_gc_collect","void",["int"])},get gcCollectALittle(){return e("il2cpp_gc_collect_a_little","void",[])},get gcDisable(){return e("il2cpp_gc_disable","void",[])},get gcEnable(){return e("il2cpp_gc_enable","void",[])},get gcForEachHeap(){return e("il2cpp_gc_foreach_heap","void",["pointer","pointer"])},get gcGetHeapSize(){return e("il2cpp_gc_get_heap_size","int64",[])},get gcGetMaxTimeSlice(){return e("il2cpp_gc_get_max_time_slice_ns","int64",[])},get gcGetUsedSize(){return e("il2cpp_gc_get_used_size","int64",[])},get gcHandleGetTarget(){return e("il2cpp_gchandle_get_target","pointer",["uint32"])},get gcHandleFree(){return e("il2cpp_gchandle_free","void",["uint32"])},get gcHandleNew(){return e("il2cpp_gchandle_new","uint32",["pointer","bool"])},get gcHandleNewWeakRef(){return e("il2cpp_gchandle_new_weakref","uint32",["pointer","bool"])},get gcIsDisabled(){return e("il2cpp_gc_is_disabled","bool",[])},get gcIsIncremental(){return e("il2cpp_gc_is_incremental","bool",[])},get gcSetMaxTimeSlice(){return e("il2cpp_gc_set_max_time_slice_ns","void",["int64"])},get gcStartIncrementalCollection(){return e("il2cpp_gc_start_incremental_collection","void",[])},get gcStartWorld(){return e("il2cpp_start_gc_world","void",[])},get gcStopWorld(){return e("il2cpp_stop_gc_world","void",[])},get getCorlib(){return e("il2cpp_get_corlib","pointer",[])},get imageGetAssembly(){return e("il2cpp_image_get_assembly","pointer",["pointer"])},get imageGetClass(){return e("il2cpp_image_get_class","pointer",["pointer","uint"])},get imageGetClassCount(){return e("il2cpp_image_get_class_count","uint32",["pointer"])},get imageGetName(){return e("il2cpp_image_get_name","pointer",["pointer"])},get initialize(){return e("il2cpp_init","void",["pointer"])},get livenessAllocateStruct(){return e("il2cpp_unity_liveness_allocate_struct","pointer",["pointer","int","pointer","pointer","pointer"])},get livenessCalculationBegin(){return e("il2cpp_unity_liveness_calculation_begin","pointer",["pointer","int","pointer","pointer","pointer","pointer"])},get livenessCalculationEnd(){return e("il2cpp_unity_liveness_calculation_end","void",["pointer"])},get livenessCalculationFromStatics(){return e("il2cpp_unity_liveness_calculation_from_statics","void",["pointer"])},get livenessFinalize(){return e("il2cpp_unity_liveness_finalize","void",["pointer"])},get livenessFreeStruct(){return e("il2cpp_unity_liveness_free_struct","void",["pointer"])},get memorySnapshotCapture(){return e("il2cpp_capture_memory_snapshot","pointer",[])},get memorySnapshotFree(){return e("il2cpp_free_captured_memory_snapshot","void",["pointer"])},get memorySnapshotGetClasses(){return e("il2cpp_memory_snapshot_get_classes","pointer",["pointer","pointer"])},get memorySnapshotGetObjects(){return e("il2cpp_memory_snapshot_get_objects","pointer",["pointer","pointer"])},get methodGetClass(){return e("il2cpp_method_get_class","pointer",["pointer"])},get methodGetFlags(){return e("il2cpp_method_get_flags","uint32",["pointer","pointer"])},get methodGetName(){return e("il2cpp_method_get_name","pointer",["pointer"])},get methodGetObject(){return e("il2cpp_method_get_object","pointer",["pointer","pointer"])},get methodGetParameterCount(){return e("il2cpp_method_get_param_count","uint8",["pointer"])},get methodGetParameterName(){return e("il2cpp_method_get_param_name","pointer",["pointer","uint32"])},get methodGetParameters(){return e("il2cpp_method_get_parameters","pointer",["pointer","pointer"])},get methodGetParameterType(){return e("il2cpp_method_get_param","pointer",["pointer","uint32"])},get methodGetReturnType(){return e("il2cpp_method_get_return_type","pointer",["pointer"])},get methodIsGeneric(){return e("il2cpp_method_is_generic","bool",["pointer"])},get methodIsInflated(){return e("il2cpp_method_is_inflated","bool",["pointer"])},get methodIsInstance(){return e("il2cpp_method_is_instance","bool",["pointer"])},get monitorEnter(){return e("il2cpp_monitor_enter","void",["pointer"])},get monitorExit(){return e("il2cpp_monitor_exit","void",["pointer"])},get monitorPulse(){return e("il2cpp_monitor_pulse","void",["pointer"])},get monitorPulseAll(){return e("il2cpp_monitor_pulse_all","void",["pointer"])},get monitorTryEnter(){return e("il2cpp_monitor_try_enter","bool",["pointer","uint32"])},get monitorTryWait(){return e("il2cpp_monitor_try_wait","bool",["pointer","uint32"])},get monitorWait(){return e("il2cpp_monitor_wait","void",["pointer"])},get objectGetClass(){return e("il2cpp_object_get_class","pointer",["pointer"])},get objectGetVirtualMethod(){return e("il2cpp_object_get_virtual_method","pointer",["pointer","pointer"])},get objectInitialize(){return e("il2cpp_runtime_object_init_exception","void",["pointer","pointer"])},get objectNew(){return e("il2cpp_object_new","pointer",["pointer"])},get objectGetSize(){return e("il2cpp_object_get_size","uint32",["pointer"])},get objectUnbox(){return e("il2cpp_object_unbox","pointer",["pointer"])},get resolveInternalCall(){return e("il2cpp_resolve_icall","pointer",["pointer"])},get stringGetChars(){return e("il2cpp_string_chars","pointer",["pointer"])},get stringGetLength(){return e("il2cpp_string_length","int32",["pointer"])},get stringNew(){return e("il2cpp_string_new","pointer",["pointer"])},get valueTypeBox(){return e("il2cpp_value_box","pointer",["pointer","pointer"])},get threadAttach(){return e("il2cpp_thread_attach","pointer",["pointer"])},get threadDetach(){return e("il2cpp_thread_detach","void",["pointer"])},get threadGetAttachedThreads(){return e("il2cpp_thread_get_all_attached_threads","pointer",["pointer"])},get threadGetCurrent(){return e("il2cpp_thread_current","pointer",[])},get threadIsVm(){return e("il2cpp_is_vm_thread","bool",["pointer"])},get typeEquals(){return e("il2cpp_type_equals","bool",["pointer","pointer"])},get typeGetClass(){return e("il2cpp_class_from_type","pointer",["pointer"])},get typeGetName(){return e("il2cpp_type_get_name","pointer",["pointer"])},get typeGetObject(){return e("il2cpp_type_get_object","pointer",["pointer"])},get typeGetTypeEnum(){return e("il2cpp_type_get_type","int",["pointer"])}},fi(t.exports,S),ve(t,"memorySnapshotExports",()=>new CModule(`#include <stdint.h>
#include <string.h>

typedef struct Il2CppManagedMemorySnapshot Il2CppManagedMemorySnapshot;
typedef struct Il2CppMetadataType Il2CppMetadataType;

struct Il2CppManagedMemorySnapshot
{
  struct Il2CppManagedHeap
  {
    uint32_t section_count;
    void * sections;
  } heap;
  struct Il2CppStacks
  {
    uint32_t stack_count;
    void * stacks;
  } stacks;
  struct Il2CppMetadataSnapshot
  {
    uint32_t type_count;
    Il2CppMetadataType * types;
  } metadata_snapshot;
  struct Il2CppGCHandles
  {
    uint32_t tracked_object_count;
    void ** pointers_to_objects;
  } gc_handles;
  struct Il2CppRuntimeInformation
  {
    uint32_t pointer_size;
    uint32_t object_header_size;
    uint32_t array_header_size;
    uint32_t array_bounds_offset_in_header;
    uint32_t array_size_offset_in_header;
    uint32_t allocation_granularity;
  } runtime_information;
  void * additional_user_information;
};

struct Il2CppMetadataType
{
  uint32_t flags;
  void * fields;
  uint32_t field_count;
  uint32_t statics_size;
  uint8_t * statics;
  uint32_t base_or_element_type_index;
  char * name;
  const char * assembly_name;
  uint64_t type_info_address;
  uint32_t size;
};

uintptr_t
il2cpp_memory_snapshot_get_classes (
    const Il2CppManagedMemorySnapshot * snapshot, Il2CppMetadataType ** iter)
{
  const int zero = 0;
  const void * null = 0;

  if (iter != NULL && snapshot->metadata_snapshot.type_count > zero)
  {
    if (*iter == null)
    {
      *iter = snapshot->metadata_snapshot.types;
      return (uintptr_t) (*iter)->type_info_address;
    }
    else
    {
      Il2CppMetadataType * metadata_type = *iter + 1;

      if (metadata_type < snapshot->metadata_snapshot.types +
                              snapshot->metadata_snapshot.type_count)
      {
        *iter = metadata_type;
        return (uintptr_t) (*iter)->type_info_address;
      }
    }
  }
  return 0;
}

void **
il2cpp_memory_snapshot_get_objects (
    const Il2CppManagedMemorySnapshot * snapshot, uint32_t * size)
{
  *size = snapshot->gc_handles.tracked_object_count;
  return snapshot->gc_handles.pointers_to_objects;
}
`),S);function e(n,r,s){let o=t.$config.exports?.[n]?.()??t.module.findExportByName(n)??t.memorySnapshotExports[n],i=new NativeFunction(o??NULL,r,s);return i.isNull()?new Proxy(i,{get(a,c){let l=a[c];return typeof l=="function"?l.bind(a):l},apply(){o==null?D(`couldn't resolve export ${n}`):o.isNull()&&D(`export ${n} points to NULL IL2CPP library has likely been stripped, obfuscated, or customized`)}}):i}})(A||(A={}));var A;(function(t){function e(r){return s=>s instanceof t.Class?r.isAssignableFrom(s):r.isAssignableFrom(s.class)}t.is=e;function n(r){return s=>s instanceof t.Class?s.equals(r):s.class.equals(r)}t.isExactly=n})(A||(A={}));var A;(function(t){t.gc={get heapSections(){let e=[];return t.exports.gcForEachHeap(new NativeCallback((n,r)=>{e.push({base:n.readPointer(),size:n.add(Process.pointerSize).readU32()})},"void",["pointer","pointer"]),NULL),e},get heapSize(){return t.exports.gcGetHeapSize()},get isEnabled(){return!t.exports.gcIsDisabled()},get isIncremental(){return!!t.exports.gcIsIncremental()},get maxTimeSlice(){return t.exports.gcGetMaxTimeSlice()},get usedHeapSize(){return t.exports.gcGetUsedSize()},set isEnabled(e){e?t.exports.gcEnable():t.exports.gcDisable()},set maxTimeSlice(e){t.exports.gcSetMaxTimeSlice(e)},choose(e){let n=[],r=(o,i)=>{for(let a=0;a<i;a++)n.push(new t.Object(o.add(a*Process.pointerSize).readPointer()))},s=new NativeCallback(r,"void",["pointer","int","pointer"]);if(t.exports.livenessCalculationBegin.isNull()){let o=(c,l)=>!c.isNull()&&l.compare(0)==0?(t.free(c),NULL):t.alloc(l),i=new NativeCallback(o,"pointer",["pointer","size_t","pointer"]);this.stopWorld();let a=t.exports.livenessAllocateStruct(e,0,s,NULL,i);t.exports.livenessCalculationFromStatics(a),t.exports.livenessFinalize(a),this.startWorld(),t.exports.livenessFreeStruct(a)}else{let o=new NativeCallback(()=>{},"void",[]),i=t.exports.livenessCalculationBegin(e,0,s,NULL,o,o);t.exports.livenessCalculationFromStatics(i),t.exports.livenessCalculationEnd(i)}return n},collect(e){t.exports.gcCollect(e<0?0:e>2?2:e)},collectALittle(){t.exports.gcCollectALittle()},startWorld(){return t.exports.gcStartWorld()},startIncrementalCollection(){return t.exports.gcStartIncrementalCollection()},stopWorld(){return t.exports.gcStopWorld()}}})(A||(A={}));var pn;(function(t){ve(t,"apiLevel",()=>{let n=e("ro.build.version.sdk");return n?parseInt(n):null},S);function e(n){let r=Process.findModuleByName("libc.so")?.findExportByName("__system_property_get");if(r){let s=new NativeFunction(r,"void",["pointer","pointer"]),o=Memory.alloc(92).writePointer(NULL);return s(Memory.allocUtf8String(n),o),o.readCString()??void 0}}})(pn||(pn={}));function D(t){let e=new Error(t);throw e.name="Il2CppError",e.stack=e.stack?.replace(/^(Il2Cpp)?Error/,"\x1B[0m\x1B[38;5;9mil2cpp\x1B[0m")?.replace(/\n    at (.+) \((.+):(.+)\)/,"\x1B[3m\x1B[2m")?.concat("\x1B[0m"),e}function pt(t){globalThis.console.log(`\x1B[38;5;11mil2cpp\x1B[0m: ${t}`)}function mn(t){globalThis.console.log(`\x1B[38;5;12mil2cpp\x1B[0m: ${t}`)}function fi(t,e,n=Object.getOwnPropertyDescriptors(t)){for(let r in n)n[r]=e(t,r,n[r]);return Object.defineProperties(t,n),t}function ve(t,e,n,r){globalThis.Object.defineProperty(t,e,r?.(t,e,{get:n,configurable:!0})??{get:n,configurable:!0})}function S(t,e,n){let r=n.get;if(!r)throw new Error("@lazy can only be applied to getter accessors");return n.get=function(){let s=r.call(this);return Object.defineProperty(this,e,{value:s,configurable:n.configurable,enumerable:n.enumerable,writable:!1}),s},n}var me=class{handle;constructor(e){e instanceof NativePointer?this.handle=e:this.handle=e.handle}equals(e){return this.handle.equals(e.handle)}isNull(){return this.handle.isNull()}asNullable(){return this.isNull()?null:this}};function hi(t){return Object.keys(t).reduce((e,n)=>(e[e[n]]=n,e),t)}NativePointer.prototype.offsetOf=function(t,e){e??=512;for(let n=0;e>0?n<e:n<-e;n++)if(t(e>0?this.add(n):this.sub(n)))return n;return null};function ht(t){let e=[],n=Memory.alloc(Process.pointerSize),r=t(n);for(;!r.isNull();)e.push(r),r=t(n);return e}function gn(t){let e=Memory.alloc(Process.pointerSize),n=t(e);if(n.isNull())return[];let r=new Array(e.readInt());for(let s=0;s<r.length;s++)r[s]=n.add(s*Process.pointerSize).readPointer();return r}function mt(t){return new Proxy(t,{cache:new Map,construct(e,n){let r=n[0].toUInt32();return this.cache.has(r)||this.cache.set(r,new e(n[0])),this.cache.get(r)}})}var _n;(function(t){let e=/(6\d{3}|20\d{2}|\d)\.(\d)\.(\d{1,2})(?:[abcfp]|rc){0,2}\d?/;function n(i){return i?.match(e)?.[0]}t.find=n;function r(i,a){return o(i,a)>=0}t.gte=r;function s(i,a){return o(i,a)<0}t.lt=s;function o(i,a){let c=i.match(e),l=a.match(e);for(let d=1;d<=3;d++){let f=Number(c?.[d]??-1),h=Number(l?.[d]??-1);if(f>h)return 1;if(f<h)return-1}return 0}})(_n||(_n={}));var A;(function(t){function e(a=Process.pointerSize){return t.exports.alloc(a)}t.alloc=e;function n(a){return t.exports.free(a)}t.free=n;function r(a,c){switch(c.enumValue){case t.Type.Enum.BOOLEAN:return!!a.readS8();case t.Type.Enum.BYTE:return a.readS8();case t.Type.Enum.UBYTE:return a.readU8();case t.Type.Enum.SHORT:return a.readS16();case t.Type.Enum.USHORT:return a.readU16();case t.Type.Enum.INT:return a.readS32();case t.Type.Enum.UINT:return a.readU32();case t.Type.Enum.CHAR:return a.readU16();case t.Type.Enum.LONG:return a.readS64();case t.Type.Enum.ULONG:return a.readU64();case t.Type.Enum.FLOAT:return a.readFloat();case t.Type.Enum.DOUBLE:return a.readDouble();case t.Type.Enum.NINT:case t.Type.Enum.NUINT:return a.readPointer();case t.Type.Enum.POINTER:return new t.Pointer(a.readPointer(),c.class.baseType);case t.Type.Enum.VALUE_TYPE:return new t.ValueType(a,c);case t.Type.Enum.OBJECT:case t.Type.Enum.CLASS:return new t.Object(a.readPointer());case t.Type.Enum.GENERIC_INSTANCE:return c.class.isValueType?new t.ValueType(a,c):new t.Object(a.readPointer());case t.Type.Enum.STRING:return new t.String(a.readPointer());case t.Type.Enum.ARRAY:case t.Type.Enum.NARRAY:return new t.Array(a.readPointer())}D(`couldn't read the value from ${a} using an unhandled or unknown type ${c.name} (${c.enumValue}), please file an issue`)}t.read=r;function s(a,c,l){switch(l.enumValue){case t.Type.Enum.BOOLEAN:return a.writeS8(+c);case t.Type.Enum.BYTE:return a.writeS8(c);case t.Type.Enum.UBYTE:return a.writeU8(c);case t.Type.Enum.SHORT:return a.writeS16(c);case t.Type.Enum.USHORT:return a.writeU16(c);case t.Type.Enum.INT:return a.writeS32(c);case t.Type.Enum.UINT:return a.writeU32(c);case t.Type.Enum.CHAR:return a.writeU16(c);case t.Type.Enum.LONG:return a.writeS64(c);case t.Type.Enum.ULONG:return a.writeU64(c);case t.Type.Enum.FLOAT:return a.writeFloat(c);case t.Type.Enum.DOUBLE:return a.writeDouble(c);case t.Type.Enum.NINT:case t.Type.Enum.NUINT:case t.Type.Enum.POINTER:case t.Type.Enum.STRING:case t.Type.Enum.ARRAY:case t.Type.Enum.NARRAY:return a.writePointer(c);case t.Type.Enum.VALUE_TYPE:return Memory.copy(a,c,l.class.valueTypeSize),a;case t.Type.Enum.OBJECT:case t.Type.Enum.CLASS:case t.Type.Enum.GENERIC_INSTANCE:return c instanceof t.ValueType?(Memory.copy(a,c,l.class.valueTypeSize),a):a.writePointer(c)}D(`couldn't write value ${c} to ${a} using an unhandled or unknown type ${l.name} (${l.enumValue}), please file an issue`)}t.write=s;function o(a,c){if(globalThis.Array.isArray(a)){let l=Memory.alloc(c.class.valueTypeSize),d=c.class.fields.filter(f=>!f.isStatic);for(let f=0;f<d.length;f++){let h=o(a[f],d[f].type);s(l.add(d[f].offset).sub(t.Object.headerSize),h,d[f].type)}return new t.ValueType(l,c)}else if(a instanceof NativePointer){if(c.isByReference)return new t.Reference(a,c);switch(c.enumValue){case t.Type.Enum.POINTER:return new t.Pointer(a,c.class.baseType);case t.Type.Enum.STRING:return new t.String(a);case t.Type.Enum.CLASS:case t.Type.Enum.GENERIC_INSTANCE:case t.Type.Enum.OBJECT:return new t.Object(a);case t.Type.Enum.ARRAY:case t.Type.Enum.NARRAY:return new t.Array(a);default:return a}}else return c.enumValue==t.Type.Enum.BOOLEAN?!!a:c.enumValue==t.Type.Enum.VALUE_TYPE&&c.class.isEnum?o([a],c):a}t.fromFridaValue=o;function i(a){if(typeof a=="boolean")return+a;if(a instanceof t.ValueType){if(a.type.class.isEnum)return a.field("value__").value;{let c=a.type.class.fields.filter(l=>!l.isStatic).map(l=>i(l.bind(a).value));return c.length==0?[0]:c}}else return a}t.toFridaValue=i})(A||(A={}));var A;(function(t){ve(t,"module",()=>n()??D("Could not find IL2CPP module"));async function e(s=!1){let o=n()??await new Promise(i=>{let[a,c]=r(),l=setTimeout(()=>{pt(`after 10 seconds, IL2CPP module '${a}' has not been loaded yet, is the app running?`)},1e4),d=Process.attachModuleObserver({onAdded(f){(f.name==a||c&&f.name==c)&&(clearTimeout(l),setImmediate(()=>{i(f),d.detach()}))}})});return Reflect.defineProperty(t,"module",{value:o}),t.exports.getCorlib().isNull()?await new Promise(i=>{let a=setTimeout(()=>{t.exports.getCorlib().isNull()||(pt("resuming execution despite IL2CPP initialization not being captured in time, please open an issue as this is suboptimal"),c.detach(),i(!1))},1e3),c=Interceptor.attach(t.exports.initialize,{onEnter(){clearTimeout(a)},onLeave(){c.detach(),s?i(!0):setImmediate(()=>i(!1))}})}):!1}t.initialize=e;function n(){let[s,o]=r();return Process.findModuleByName(s)??Process.findModuleByName(o??s)??(Process.platform=="darwin"?Process.findModuleByAddress(DebugSymbol.fromName("il2cpp_init").address):void 0)??void 0}function r(){if(t.$config.moduleName)return[t.$config.moduleName];switch(Process.platform){case"linux":return[pn.apiLevel?"libil2cpp.so":"GameAssembly.so"];case"windows":return["GameAssembly.dll"];case"darwin":return["UnityFramework","GameAssembly.dylib"]}D(`${Process.platform} is not supported yet`)}})(A||(A={}));var A;(function(t){function e(n,r){let s=typeof n=="boolean"?t.corlib.class("System.Boolean"):typeof n=="number"?r??t.corlib.class("System.Int32"):n instanceof Int64?t.corlib.class("System.Int64"):n instanceof UInt64?t.corlib.class("System.UInt64"):n instanceof NativePointer?r??t.corlib.class("System.IntPtr"):n instanceof t.ValueType?n.type.class:r??D(`A class must be specified when constructing a nullable for value '${n}'`);s.isValueType==!1&&D(`Cannot create nullable value type out of a reference type '${s.type.name}'`);let o=t.corlib.class("System.Nullable`1").inflate(s),i=new t.ValueType(Memory.alloc(o.valueTypeSize),o.type);return(i.tryField("hasValue")??i.field("has_value")).value=n!=null,n!=null&&(i.field("value").value=n),i}t.nullable=e})(A||(A={}));var A;(function(t){async function e(n,r="bind"){let s=null;try{let o=await t.initialize(r=="main");if(r=="main"&&!o)return e(()=>t.mainThread.schedule(n),"free");t.currentThread==null&&(s=t.domain.attach()),r=="bind"&&s!=null&&Script.bindWeak(globalThis,()=>s?.detach());let i=n();return i instanceof Promise?await i:i}catch(o){return Script.nextTick(i=>{throw i},o),Promise.reject(o)}finally{r=="free"&&s!=null&&s.detach()}}t.perform=e})(A||(A={}));var A;(function(t){class e{#e={depth:0,buffer:[],history:new Set,flush:()=>{if(this.#e.depth==0){let o=`
${this.#e.buffer.join(`
`)}
`;if(this.#u)mn(o);else{let i=Checksum.compute("md5",o);this.#e.history.has(i)||(this.#e.history.add(i),mn(o))}this.#e.buffer.length=0}}};#d=t.mainThread.id;#u=!1;#f;#c=[];#l;#t;#n;#r;#s;#o;#i;#a;constructor(o){this.#f=o}thread(o){return this.#d=o.id,this}verbose(o){return this.#u=o,this}domain(){return this.#l=t.domain,this}assemblies(...o){return this.#t=o,this}classes(...o){return this.#n=o,this}methods(...o){return this.#r=o,this}filterAssemblies(o){return this.#s=o,this}filterClasses(o){return this.#o=o,this}filterMethods(o){return this.#i=o,this}filterParameters(o){return this.#a=o,this}and(){let o=h=>{if(this.#a==null){this.#c.push(h);return}for(let u of h.parameters)if(this.#a(u)){this.#c.push(h);break}},i=h=>{for(let u of h)o(u)},a=h=>{if(this.#i==null){i(h.methods);return}for(let u of h.methods)this.#i(u)&&o(u)},c=h=>{for(let u of h)a(u)},l=h=>{if(this.#o==null){c(h.image.classes);return}for(let u of h.image.classes)this.#o(u)&&a(u)},d=h=>{for(let u of h)l(u)},f=h=>{if(this.#s==null){d(h.assemblies);return}for(let u of h.assemblies)this.#s(u)&&l(u)};return this.#r?i(this.#r):this.#n?c(this.#n):this.#t?d(this.#t):this.#l&&f(this.#l),this.#t=void 0,this.#n=void 0,this.#r=void 0,this.#s=void 0,this.#o=void 0,this.#i=void 0,this.#a=void 0,this}attach(){for(let o of this.#c)if(!o.virtualAddress.isNull())try{this.#f(o,this.#e,this.#d)}catch(i){switch(i.message){case/unable to intercept function at \w+; please file a bug/.exec(i.message)?.input:case"already replaced this function":break;default:throw i}}}}t.Tracer=e;function n(s=!1){let o=()=>(a,c,l)=>{let d=a.relativeVirtualAddress.toString(16).padStart(8,"0");Interceptor.attach(a.virtualAddress,{onEnter(){this.threadId==l&&c.buffer.push(`\x1B[2m0x${d}\x1B[0m ${"\u2502 ".repeat(c.depth++)}\u250C\u2500\x1B[35m${a.class.type.name}::\x1B[1m${a.name}\x1B[0m\x1B[0m`)},onLeave(){this.threadId==l&&(c.buffer.push(`\x1B[2m0x${d}\x1B[0m ${"\u2502 ".repeat(--c.depth)}\u2514\u2500\x1B[33m${a.class.type.name}::\x1B[1m${a.name}\x1B[0m\x1B[0m`),c.flush())}})},i=()=>(a,c,l)=>{let d=a.relativeVirtualAddress.toString(16).padStart(8,"0"),f=+a.nativeSignatureHasInstanceSlot,h=function(...m){if(this.threadId==l){let g=a.isStatic?void 0:new t.Parameter("this",-1,a.class.type),y=g?[g].concat(a.parameters):a.parameters;c.buffer.push(`\x1B[2m0x${d}\x1B[0m ${"\u2502 ".repeat(c.depth++)}\u250C\u2500\x1B[35m${a.class.type.name}::\x1B[1m${a.name}\x1B[0m\x1B[0m(${y.map(E=>`\x1B[32m${E.name}\x1B[0m = \x1B[31m${t.fromFridaValue(m[E.position+f],E.type)}\x1B[0m`).join(", ")})`)}let p=a.nativeFunction(...m);return this.threadId==l&&(c.buffer.push(`\x1B[2m0x${d}\x1B[0m ${"\u2502 ".repeat(--c.depth)}\u2514\u2500\x1B[33m${a.class.type.name}::\x1B[1m${a.name}\x1B[0m\x1B[0m${p==null?"":` = \x1B[36m${t.fromFridaValue(p,a.returnType)}`}\x1B[0m`),c.flush()),p};a.revert();let u=new NativeCallback(h,a.returnType.fridaAlias,a.fridaSignature);Interceptor.replace(a.virtualAddress,u)};return new t.Tracer(s?i():o())}t.trace=n;function r(s){let o=t.domain.assemblies.flatMap(c=>c.image.classes.flatMap(l=>l.methods.filter(d=>!d.virtualAddress.isNull()))).sort((c,l)=>c.virtualAddress.compare(l.virtualAddress)),i=c=>{let l=0,d=o.length-1;for(;l<=d;){let f=Math.floor((l+d)/2),h=o[f].virtualAddress.compare(c);if(h==0)return o[f];h>0?d=f-1:l=f+1}return o[d]},a=()=>(c,l,d)=>{Interceptor.attach(c.virtualAddress,function(){if(this.threadId==d){let f=globalThis.Thread.backtrace(this.context,s);f.unshift(c.virtualAddress);for(let h of f)if(h.compare(t.module.base)>0&&h.compare(t.module.base.add(t.module.size))<0){let u=i(h);if(u){let m=h.sub(u.virtualAddress);m.compare(4095)<0&&l.buffer.push(`\x1B[2m0x${u.relativeVirtualAddress.toString(16).padStart(8,"0")}\x1B[0m\x1B[2m+0x${m.toString(16).padStart(3,"0")}\x1B[0m ${u.class.type.name}::\x1B[1m${u.name}\x1B[0m`)}}l.flush()}})};return new t.Tracer(a())}t.backtrace=r})(A||(A={}));var A;(function(t){class e extends me{static get headerSize(){return t.corlib.class("System.Array").instanceSize}get elements(){let s=t.string("vfsfitvnm").object.method("ToCharArray",0).invoke(),o=Memory.scanSync(s.handle,255,"76 00 66 00 73 00 66 00 69 00 74 00 76 00 6e 00 6d 00")[0]?.address?.sub(s.handle)??D("couldn't find the elements offset in the native array struct");return ve(t.Array.prototype,"elements",function(){return new t.Pointer(this.handle.add(o),this.elementType)},S),this.elements}get elementSize(){return this.elementType.class.arrayElementSize}get elementType(){return this.object.class.type.class.baseType}get length(){return t.exports.arrayGetLength(this)}get object(){return new t.Object(this)}get(s){return(s<0||s>=this.length)&&D(`cannot get element at index ${s} as the array length is ${this.length}`),this.elements.get(s)}set(s,o){(s<0||s>=this.length)&&D(`cannot set element at index ${s} as the array length is ${this.length}`),this.elements.set(s,o)}toString(){return this.isNull()?"null":`[${this.elements.read(this.length,0)}]`}*[Symbol.iterator](){for(let s=0;s<this.length;s++)yield this.elements.get(s)}}w([S],e.prototype,"elementSize",null),w([S],e.prototype,"elementType",null),w([S],e.prototype,"length",null),w([S],e.prototype,"object",null),w([S],e,"headerSize",null),t.Array=e;function n(r,s){let o=typeof s=="number"?s:s.length,i=new t.Array(t.exports.arrayNew(r,o));return globalThis.Array.isArray(s)&&i.elements.write(s),i}t.array=n})(A||(A={}));var A;(function(t){let e=class extends me{get image(){if(t.exports.assemblyGetImage.isNull()){let r=this.object.tryMethod("GetType",1)?.invoke(t.string("<Module>"))?.asNullable()?.tryMethod("get_Module")?.invoke()??this.object.tryMethod("GetModules",1)?.invoke(!1)?.get(0)??D(`couldn't find the runtime module object of assembly ${this.name}`);return new t.Image(r.field("_impl").value)}return new t.Image(t.exports.assemblyGetImage(this))}get name(){return this.image.name.replace(".dll","")}get object(){for(let r of t.domain.object.method("GetAssemblies",1).invoke(!1))if(r.field("_mono_assembly").value.equals(this))return r;D("couldn't find the object of the native assembly struct")}};w([S],e.prototype,"name",null),w([S],e.prototype,"object",null),e=w([mt],e),t.Assembly=e})(A||(A={}));var A;(function(t){let e=class extends me{get actualInstanceSize(){let r=t.corlib.class("System.String"),s=r.handle.offsetOf(o=>o.readInt()==r.instanceSize-2)??D("couldn't find the actual instance size offset in the native class struct");return ve(t.Class.prototype,"actualInstanceSize",function(){return this.handle.add(s).readS32()},S),this.actualInstanceSize}get arrayClass(){return new t.Class(t.exports.classGetArrayClass(this,1))}get arrayElementSize(){return t.exports.classGetArrayElementSize(this)}get assemblyName(){return t.exports.classGetAssemblyName(this).readUtf8String().replace(".dll","")}get declaringClass(){return new t.Class(t.exports.classGetDeclaringType(this)).asNullable()}get baseType(){return new t.Type(t.exports.classGetBaseType(this)).asNullable()}get elementClass(){return new t.Class(t.exports.classGetElementClass(this)).asNullable()}get fields(){return ht(r=>t.exports.classGetFields(this,r)).map(r=>new t.Field(r))}get flags(){return t.exports.classGetFlags(this)}get fullName(){return this.namespace?`${this.namespace}.${this.name}`:this.name}get genericClass(){let r=this.image.tryClass(this.fullName)?.asNullable();return r?.equals(this)?null:r??null}get generics(){if(!this.isGeneric&&!this.isInflated)return[];let r=this.type.object.method("GetGenericArguments").invoke();return globalThis.Array.from(r).map(s=>new t.Class(t.exports.classFromObject(s)))}get hasReferences(){return!!t.exports.classHasReferences(this)}get hasStaticConstructor(){let r=this.tryMethod(".cctor");return r!=null&&!r.virtualAddress.isNull()}get image(){return new t.Image(t.exports.classGetImage(this))}get instanceSize(){return t.exports.classGetInstanceSize(this)}get isAbstract(){return!!t.exports.classIsAbstract(this)}get isBlittable(){return!!t.exports.classIsBlittable(this)}get isEnum(){return!!t.exports.classIsEnum(this)}get isGeneric(){return!!t.exports.classIsGeneric(this)}get isInflated(){return!!t.exports.classIsInflated(this)}get isInterface(){return!!t.exports.classIsInterface(this)}get isStruct(){return this.isValueType&&!this.isEnum}get isValueType(){return!!t.exports.classIsValueType(this)}get interfaces(){return ht(r=>t.exports.classGetInterfaces(this,r)).map(r=>new t.Class(r))}get methods(){return ht(r=>t.exports.classGetMethods(this,r)).map(r=>new t.Method(r))}get name(){return t.exports.classGetName(this).readUtf8String()}get namespace(){return t.exports.classGetNamespace(this).readUtf8String()||void 0}get nestedClasses(){return ht(r=>t.exports.classGetNestedClasses(this,r)).map(r=>new t.Class(r))}get parent(){return new t.Class(t.exports.classGetParent(this)).asNullable()}get pointerClass(){return new t.Class(t.exports.classFromObject(this.type.object.method("MakePointerType").invoke()))}get rank(){let r=0,s=this.name;for(let o=this.name.length-1;o>0;o--){let i=s[o];if(i=="]")r++;else{if(i=="["||r==0)break;if(i==",")r++;else break}}return r}get staticFieldsData(){return t.exports.classGetStaticFieldData(this)}get valueTypeSize(){return t.exports.classGetValueTypeSize(this,NULL)}get type(){return new t.Type(t.exports.classGetType(this))}alloc(){return new t.Object(t.exports.objectNew(this))}field(r){return this.tryField(r)??D(`couldn't find field ${r} in class ${this.type.name}`)}*hierarchy(r){let s=r?.includeCurrent??!0?this:this.parent;for(;s;)yield s,s=s.parent}inflate(...r){this.isGeneric||D(`cannot inflate class ${this.type.name} as it has no generic parameters`),this.generics.length!=r.length&&D(`cannot inflate class ${this.type.name} as it needs ${this.generics.length} generic parameter(s), not ${r.length}`);let s=r.map(a=>a.type.object),o=t.array(t.corlib.class("System.Type"),s),i=this.type.object.method("MakeGenericType",1).invoke(o);return new t.Class(t.exports.classFromObject(i))}initialize(){return t.exports.classInitialize(this),this}isAssignableFrom(r){return!!t.exports.classIsAssignableFrom(this,r)}isSubclassOf(r,s){return!!t.exports.classIsSubclassOf(this,r,+s)}method(r,s=-1){return this.tryMethod(r,s)??D(`couldn't find method ${r} in class ${this.type.name}`)}nested(r){return this.tryNested(r)??D(`couldn't find nested class ${r} in class ${this.type.name}`)}new(){let r=this.alloc(),s=Memory.alloc(Process.pointerSize);t.exports.objectInitialize(r,s);let o=s.readPointer();return o.isNull()||D(new t.Object(o).toString()),r}tryField(r){return new t.Field(t.exports.classGetFieldFromName(this,Memory.allocUtf8String(r))).asNullable()}tryMethod(r,s=-1){return new t.Method(t.exports.classGetMethodFromName(this,Memory.allocUtf8String(r),s)).asNullable()}tryNested(r){return this.nestedClasses.find(s=>s.name==r)}toString(){let r=[this.parent].concat(this.interfaces);return`// ${this.assemblyName}
${this.isEnum?"enum":this.isStruct?"struct":this.isInterface?"interface":"class"} ${this.type.name}${r?` : ${r.map(s=>s?.type.name).join(", ")}`:""}
{
    ${this.fields.join(`
    `)}
    ${this.methods.join(`
    `)}
}`}static enumerate(r){let s=new NativeCallback(o=>r(new t.Class(o)),"void",["pointer","pointer"]);return t.exports.classForEach(s,NULL)}};w([S],e.prototype,"arrayClass",null),w([S],e.prototype,"arrayElementSize",null),w([S],e.prototype,"assemblyName",null),w([S],e.prototype,"declaringClass",null),w([S],e.prototype,"baseType",null),w([S],e.prototype,"elementClass",null),w([S],e.prototype,"fields",null),w([S],e.prototype,"flags",null),w([S],e.prototype,"fullName",null),w([S],e.prototype,"generics",null),w([S],e.prototype,"hasReferences",null),w([S],e.prototype,"hasStaticConstructor",null),w([S],e.prototype,"image",null),w([S],e.prototype,"instanceSize",null),w([S],e.prototype,"isAbstract",null),w([S],e.prototype,"isBlittable",null),w([S],e.prototype,"isEnum",null),w([S],e.prototype,"isGeneric",null),w([S],e.prototype,"isInflated",null),w([S],e.prototype,"isInterface",null),w([S],e.prototype,"isValueType",null),w([S],e.prototype,"interfaces",null),w([S],e.prototype,"methods",null),w([S],e.prototype,"name",null),w([S],e.prototype,"namespace",null),w([S],e.prototype,"nestedClasses",null),w([S],e.prototype,"parent",null),w([S],e.prototype,"pointerClass",null),w([S],e.prototype,"rank",null),w([S],e.prototype,"staticFieldsData",null),w([S],e.prototype,"valueTypeSize",null),w([S],e.prototype,"type",null),e=w([mt],e),t.Class=e})(A||(A={}));var A;(function(t){function e(n,r){let s=t.corlib.class("System.Delegate"),o=t.corlib.class("System.MulticastDelegate");s.isAssignableFrom(n)||D(`cannot create a delegate for ${n.type.name} as it's a non-delegate class`),(n.equals(s)||n.equals(o))&&D(`cannot create a delegate for neither ${s.type.name} nor ${o.type.name}, use a subclass instead`);let i=n.alloc(),a=i.handle.toString(),c=i.tryMethod("Invoke")??D(`cannot create a delegate for ${n.type.name}, there is no Invoke method`);i.method(".ctor").invoke(i,c.handle);let l=c.wrap(r);return i.field("method_ptr").value=l,i.field("invoke_impl").value=l,t._callbacksToKeepAlive[a]=l,i}t.delegate=e,t._callbacksToKeepAlive={}})(A||(A={}));var A;(function(t){let e=class extends me{get assemblies(){let r=gn(s=>t.exports.domainGetAssemblies(this,s));if(r.length==0){let s=this.object.method("GetAssemblies").overload().invoke();r=globalThis.Array.from(s).map(o=>o.field("_mono_assembly").value)}return r.map(s=>new t.Assembly(s))}get object(){return t.corlib.class("System.AppDomain").method("get_CurrentDomain").invoke()}assembly(r){return this.tryAssembly(r)??D(`couldn't find assembly ${r}`)}attach(){return new t.Thread(t.exports.threadAttach(this))}tryAssembly(r){return new t.Assembly(t.exports.domainGetAssemblyFromName(this,Memory.allocUtf8String(r))).asNullable()}};w([S],e.prototype,"assemblies",null),w([S],e.prototype,"object",null),e=w([mt],e),t.Domain=e,ve(t,"domain",()=>new t.Domain(t.exports.domainGet()),S)})(A||(A={}));var A;(function(t){class e extends me{get class(){return new t.Class(t.exports.fieldGetClass(this))}get flags(){return t.exports.fieldGetFlags(this)}get isLiteral(){return(this.flags&64)!=0}get isStatic(){return(this.flags&16)!=0}get isThreadStatic(){let r=t.corlib.class("System.AppDomain").field("type_resolve_in_progress").offset;return ve(t.Field.prototype,"isThreadStatic",function(){return this.offset==r},S),this.isThreadStatic}get modifier(){switch(this.flags&7){case 1:return"private";case 2:return"private protected";case 3:return"internal";case 4:return"protected";case 5:return"protected internal";case 6:return"public"}}get name(){return t.exports.fieldGetName(this).readUtf8String()}get offset(){return t.exports.fieldGetOffset(this)}get type(){return new t.Type(t.exports.fieldGetType(this))}get value(){this.isStatic||D(`cannot access instance field ${this.class.type.name}::${this.name} from a class, use an object instead`);let r=Memory.alloc(Process.pointerSize);return t.exports.fieldGetStaticValue(this.handle,r),t.read(r,this.type)}set value(r){this.isStatic||D(`cannot access instance field ${this.class.type.name}::${this.name} from a class, use an object instead`),(this.isThreadStatic||this.isLiteral)&&D(`cannot write the value of field ${this.name} as it's thread static or literal`);let s=r instanceof t.Object&&this.type.class.isValueType?r.unbox():r instanceof me?r.handle:r instanceof NativePointer?r:t.write(Memory.alloc(this.type.class.valueTypeSize),r,this.type);t.exports.fieldSetStaticValue(this.handle,s)}toString(){return`${this.isThreadStatic?"[ThreadStatic] ":""}${this.isStatic?"static ":""}${this.type.name} ${this.name}${this.isLiteral?` = ${this.type.class.isEnum?t.read(this.value.handle,this.type.class.baseType):this.value}`:""};${this.isThreadStatic||this.isLiteral?"":` // 0x${this.offset.toString(16)}`}`}bind(r){this.isStatic&&D(`cannot bind static field ${this.class.type.name}::${this.name} to an instance`);let s=this.offset-(r instanceof t.ValueType?t.Object.headerSize:0);return new Proxy(this,{get(o,i){return i=="value"?t.read(r.handle.add(s),o.type):Reflect.get(o,i)},set(o,i,a){return i=="value"?(t.write(r.handle.add(s),a,o.type),!0):Reflect.set(o,i,a)}})}}w([S],e.prototype,"class",null),w([S],e.prototype,"flags",null),w([S],e.prototype,"isLiteral",null),w([S],e.prototype,"isStatic",null),w([S],e.prototype,"isThreadStatic",null),w([S],e.prototype,"modifier",null),w([S],e.prototype,"name",null),w([S],e.prototype,"offset",null),w([S],e.prototype,"type",null),t.Field=e})(A||(A={}));var A;(function(t){class e{handle;constructor(r){this.handle=r}get target(){return new t.Object(t.exports.gcHandleGetTarget(this.handle)).asNullable()}free(){return t.exports.gcHandleFree(this.handle)}}t.GCHandle=e})(A||(A={}));var A;(function(t){let e=class extends me{get assembly(){return new t.Assembly(t.exports.imageGetAssembly(this))}get classCount(){return t.exports.imageGetClassCount.isNull()?this.classes.length:t.exports.imageGetClassCount(this)}get classes(){if(t.exports.imageGetClass.isNull()){let r=this.assembly.object.method("GetTypes").invoke(!1),s=globalThis.Array.from(r,i=>new t.Class(t.exports.classFromObject(i))),o=this.tryClass("<Module>");return o&&s.unshift(o),s}else return globalThis.Array.from(globalThis.Array(this.classCount),(r,s)=>new t.Class(t.exports.imageGetClass(this,s)))}get name(){return t.exports.imageGetName(this).readUtf8String()}class(r){return this.tryClass(r)??D(`couldn't find class ${r} in assembly ${this.name}`)}tryClass(r){let s=r.lastIndexOf("."),o=Memory.allocUtf8String(s==-1?"":r.slice(0,s)),i=Memory.allocUtf8String(r.slice(s+1));return new t.Class(t.exports.classFromName(this,o,i)).asNullable()}};w([S],e.prototype,"assembly",null),w([S],e.prototype,"classCount",null),w([S],e.prototype,"classes",null),w([S],e.prototype,"name",null),e=w([mt],e),t.Image=e,ve(t,"corlib",()=>new t.Image(t.exports.getCorlib()),S)})(A||(A={}));var A;(function(t){class e extends me{static capture(){return new t.MemorySnapshot}constructor(s=t.exports.memorySnapshotCapture()){super(s)}get classes(){return ht(s=>t.exports.memorySnapshotGetClasses(this,s)).map(s=>new t.Class(s))}get objects(){return gn(s=>t.exports.memorySnapshotGetObjects(this,s)).filter(s=>!s.isNull()).map(s=>new t.Object(s))}free(){t.exports.memorySnapshotFree(this)}}w([S],e.prototype,"classes",null),w([S],e.prototype,"objects",null),t.MemorySnapshot=e;function n(r){let s=t.MemorySnapshot.capture(),o=r(s);return s.free(),o}t.memorySnapshot=n})(A||(A={}));var A;(function(t){class e extends me{get class(){return new t.Class(t.exports.methodGetClass(this))}get flags(){return t.exports.methodGetFlags(this,NULL)}get implementationFlags(){let a=Memory.alloc(Process.pointerSize);return t.exports.methodGetFlags(this,a),a.readU32()}get fridaSignature(){let a=[];for(let c of this.parameters)a.push(c.type.fridaAlias);return this.nativeSignatureHasInstanceSlot&&a.unshift("pointer"),this.isInflated&&a.push("pointer"),a}get generics(){if(!this.isGeneric)return[];let a=this.object.method("GetGenericArguments").invoke();return globalThis.Array.from(a).map(c=>new t.Class(t.exports.classFromObject(c)))}get isExternal(){return(this.implementationFlags&4096)!=0}get isGeneric(){return!!t.exports.methodIsGeneric(this)}get isInflated(){return!!t.exports.methodIsInflated(this)}get isStatic(){return!t.exports.methodIsInstance(this)}get isSynchronized(){return(this.implementationFlags&32)!=0}get modifier(){switch(this.flags&7){case 1:return"private";case 2:return"private protected";case 3:return"internal";case 4:return"protected";case 5:return"protected internal";case 6:return"public"}}get name(){return t.exports.methodGetName(this).readUtf8String()}get nativeFunction(){return new NativeFunction(this.virtualAddress,this.returnType.fridaAlias,this.fridaSignature)}get nativeSignatureHasInstanceSlot(){return!this.isStatic||n()}get object(){return new t.Object(t.exports.methodGetObject(this,NULL))}get parameterCount(){return t.exports.methodGetParameterCount(this)}get parameters(){return globalThis.Array.from(globalThis.Array(this.parameterCount),(a,c)=>{let l=t.exports.methodGetParameterName(this,c).readUtf8String(),d=t.exports.methodGetParameterType(this,c);return new t.Parameter(l,c,new t.Type(d))})}get relativeVirtualAddress(){return this.virtualAddress.sub(t.module.base)}get returnType(){return new t.Type(t.exports.methodGetReturnType(this))}get virtualAddress(){let a=s();return ve(t.Method.prototype,"virtualAddress",function(){return this.handle.add(a).readPointer()},S),t.corlib.class("System.Reflection.Module").method(".cctor").invoke(),this.virtualAddress}set implementation(a){try{Interceptor.replace(this.virtualAddress,this.wrap(a))}catch(c){switch(c.message){case"access violation accessing 0x0":D(`couldn't set implementation for method ${this.name} as it has a NULL virtual address`);case/unable to intercept function at \w+; please file a bug/.exec(c.message)?.input:pt(`couldn't set implementation for method ${this.name} as it may be a thunk`);break;case"already replaced this function":pt(`couldn't set implementation for method ${this.name} as it has already been replaced by a thunk`);break;default:throw c}}}inflate(...a){if(!this.isGeneric||this.generics.length!=a.length){for(let f of this.overloads())if(f.isGeneric&&f.generics.length==a.length)return f.inflate(...a);D(`could not find inflatable signature of method ${this.name} with ${a.length} generic parameter(s)`)}let c=a.map(f=>f.type.object),l=t.array(t.corlib.class("System.Type"),c),d=this.object.method("MakeGenericMethod",1).invoke(l);return new t.Method(d.field("mhandle").value)}invoke(...a){return this.isStatic||D(`cannot invoke non-static method ${this.name} as it must be invoked throught a Il2Cpp.Object, not a Il2Cpp.Class`),this.invokeRaw(NULL,...a)}invokeRaw(a,...c){let l=c.map(t.toFridaValue);this.nativeSignatureHasInstanceSlot&&l.unshift(a),this.isInflated&&l.push(this.handle);try{let d=this.nativeFunction(...l);return t.fromFridaValue(d,this.returnType)}catch(d){switch(d==null&&D("an unexpected native invocation exception occurred, this is due to parameter types mismatch"),d.message){case"bad argument count":D(`couldn't invoke method ${this.name} as it needs ${this.parameterCount} parameter(s), not ${c.length}`);case"expected a pointer":case"expected number":case"expected array with fields":D(`couldn't invoke method ${this.name} using incorrect parameter types`)}throw d}}overload(...a){return this.tryOverload(...a)??D(`couldn't find overloaded method ${this.name}(${a.map(l=>l instanceof t.Class?l.type.name:l)})`)}*overloads(){for(let a of this.class.hierarchy())for(let c of a.methods)this.name==c.name&&(yield c)}parameter(a){return this.tryParameter(a)??D(`couldn't find parameter ${a} in method ${this.name}`)}revert(){Interceptor.revert(this.virtualAddress),Interceptor.flush()}tryOverload(...a){let c=a.length*1,l=a.length*2,d;e:for(let f of this.overloads()){if(f.parameterCount!=a.length)continue;let h=0,u=0;for(let m of f.parameters){let p=a[u];if(p instanceof t.Class)if(m.type.is(p.type))h+=2;else if(m.type.class.isAssignableFrom(p))h+=1;else continue e;else if(m.type.name==p)h+=2;else continue e;u++}if(!(h<c)){if(h==l)return f;if(d==null||h>d[0])d=[h,f];else if(h==d[0]){let m=0;for(let p of d[1].parameters){if(p.type.class.isAssignableFrom(f.parameters[m].type.class)){d=[h,f];continue e}m++}}}}return d?.[1]}tryParameter(a){return this.parameters.find(c=>c.name==a)}toString(){return`${this.isStatic?"static ":""}${this.returnType.name} ${this.name}${this.generics.length>0?`<${this.generics.map(a=>a.type.name).join(",")}>`:""}(${this.parameters.join(", ")});${this.virtualAddress.isNull()?"":` // 0x${this.relativeVirtualAddress.toString(16).padStart(8,"0")}`}`}bind(a){return this.isStatic&&D(`cannot bind static method ${this.class.type.name}::${this.name} to an instance`),new Proxy(this,{get(c,l,d){switch(l){case"invoke":let f=a instanceof t.ValueType?c.class.isValueType?a.handle.sub(r()?t.Object.headerSize:0):D(`cannot invoke method ${c.class.type.name}::${c.name} against a value type, you must box it first`):c.class.isValueType?a.handle.add(r()?0:t.Object.headerSize):a.handle;return c.invokeRaw.bind(c,f);case"overloads":return function*(){for(let u of c[l]())u.isStatic||(yield u)};case"inflate":case"overload":case"tryOverload":let h=Reflect.get(c,l).bind(d);return function(...u){return h(...u)?.bind(a)}}return Reflect.get(c,l)}})}wrap(a){let c=+this.nativeSignatureHasInstanceSlot;return new NativeCallback((...l)=>{let d=this.isStatic?this.class:this.class.isValueType?new t.ValueType(l[0].add(r()?t.Object.headerSize:0),this.class.type):new t.Object(l[0]),f=this.parameters.map((u,m)=>t.fromFridaValue(l[m+c],u.type)),h=a.call(d,...f);return t.toFridaValue(h)},this.returnType.fridaAlias,this.fridaSignature)}static fromVirtualAddress(a){return this.tryFromVirtualAddress(a)??D(`couldn't find method at virtual address ${a}`)}static tryFromVirtualAddress(a){a.isNull()&&D("method virtual address cannot be null");let c=function*(){yield*o.values(),yield*Process.enumerateRanges("rw-").filter(l=>l.file==null)};for(let l of c()){let d;try{d=Memory.scanSync(l.base,l.size,a.toMatchPattern())}catch{continue}for(let{address:f}of d){let h=new t.Method(f.sub(s()));try{if(h.name==null)continue}catch{continue}let u=o.get(l.base.toInt32());return(u==null||u.size!=l.size)&&o.set(l.base.toInt32(),l),h}}}static fromRelativeVirtualAddress(a){return this.tryFromRelativeVirtualAddress(a)??D(`couldn't find method with RVA 0x${a.toString(16)}`)}static tryFromRelativeVirtualAddress(a){return this.tryFromVirtualAddress(t.module.base.add(ptr(a)))}static fromAnyAddress(a){return this.tryFromAnyAddress(a)??D(`couldn't find method containing address ${a}`)}static tryFromAnyAddress(a){let c=Process.findFunctionRange(a);return c==null?void 0:this.tryFromVirtualAddress(c.base)}}w([S],e.prototype,"class",null),w([S],e.prototype,"flags",null),w([S],e.prototype,"implementationFlags",null),w([S],e.prototype,"fridaSignature",null),w([S],e.prototype,"generics",null),w([S],e.prototype,"isExternal",null),w([S],e.prototype,"isGeneric",null),w([S],e.prototype,"isInflated",null),w([S],e.prototype,"isStatic",null),w([S],e.prototype,"isSynchronized",null),w([S],e.prototype,"modifier",null),w([S],e.prototype,"name",null),w([S],e.prototype,"nativeFunction",null),w([S],e.prototype,"object",null),w([S],e.prototype,"parameterCount",null),w([S],e.prototype,"parameters",null),w([S],e.prototype,"relativeVirtualAddress",null),w([S],e.prototype,"returnType",null),t.Method=e;let n=()=>{let i=t.corlib.class("System.Object"),a=new NativeFunction(i.method("Equals",2).virtualAddress,"bool",["pointer","pointer"]),c=i.new(),d=!a(c,c);return(n=()=>d)()},r=()=>{let i=t.corlib.class("System.Int64").alloc();i.field("m_value").value=3735928559;let a=i.method("Equals",1).overload(i.class).invokeRaw(i,3735928559);return(r=()=>a)()},s=()=>{let i=t.corlib.class("System.Reflection.Module").initialize().field("FilterTypeName").value,a=i.field("method_ptr").value,l=i.field("method").value.offsetOf(d=>d.readPointer().equals(a))??D("couldn't find the virtual address offset in the native method struct");return(s=()=>l)()},o=new Map})(A||(A={}));var A;(function(t){class e extends me{static get headerSize(){return t.corlib.class("System.Object").instanceSize}get base(){return this.class.parent==null&&D(`class ${this.class.type.name} has no parent`),new Proxy(this,{get(r,s,o){return s=="class"?Reflect.get(r,s).parent:s=="base"?Reflect.getOwnPropertyDescriptor(t.Object.prototype,s).get.bind(o)():Reflect.get(r,s)}})}get class(){return new t.Class(t.exports.objectGetClass(this))}get monitor(){return new t.Object.Monitor(this)}get size(){return t.exports.objectGetSize(this)}field(r){return this.tryField(r)??D(`couldn't find non-static field ${r} in hierarchy of class ${this.class.type.name}`)}method(r,s=-1){return this.tryMethod(r,s)??D(`couldn't find non-static method ${r} in hierarchy of class ${this.class.type.name}`)}ref(r){return new t.GCHandle(t.exports.gcHandleNew(this,+r))}virtualMethod(r){return new t.Method(t.exports.objectGetVirtualMethod(this,r)).bind(this)}tryField(r){let s=this.class.tryField(r);if(s?.isStatic){for(let o of this.class.hierarchy({includeCurrent:!1}))for(let i of o.fields)if(i.name==r&&!i.isStatic)return i.bind(this);return}return s?.bind(this)}tryMethod(r,s=-1){let o=this.class.tryMethod(r,s);if(o?.isStatic){for(let i of this.class.hierarchy())for(let a of i.methods)if(a.name==r&&!a.isStatic&&(s<0||a.parameterCount==s))return a.bind(this);return}return o?.bind(this)}toString(){return this.isNull()?"null":this.method("ToString",0).invoke().content??"null"}unbox(){return this.class.isValueType?new t.ValueType(t.exports.objectUnbox(this),this.class.type):D(`couldn't unbox instances of ${this.class.type.name} as they are not value types`)}weakRef(r){return new t.GCHandle(t.exports.gcHandleNewWeakRef(this,+r))}}w([S],e.prototype,"class",null),w([S],e.prototype,"size",null),w([S],e,"headerSize",null),t.Object=e,function(n){class r{handle;constructor(o){this.handle=o}enter(){return t.exports.monitorEnter(this.handle)}exit(){return t.exports.monitorExit(this.handle)}pulse(){return t.exports.monitorPulse(this.handle)}pulseAll(){return t.exports.monitorPulseAll(this.handle)}tryEnter(o){return!!t.exports.monitorTryEnter(this.handle,o)}tryWait(o){return!!t.exports.monitorTryWait(this.handle,o)}wait(){return t.exports.monitorWait(this.handle)}}n.Monitor=r}(e=t.Object||(t.Object={}))})(A||(A={}));var A;(function(t){class e{name;position;type;constructor(r,s,o){this.name=r,this.position=s,this.type=o}toString(){return`${this.type.name} ${this.name}`}}t.Parameter=e})(A||(A={}));var A;(function(t){class e extends me{type;constructor(r,s){super(r),this.type=s}get(r){return t.read(this.handle.add(r*this.type.class.arrayElementSize),this.type)}read(r,s=0){let o=new globalThis.Array(r);for(let i=0;i<r;i++)o[i]=this.get(i+s);return o}set(r,s){t.write(this.handle.add(r*this.type.class.arrayElementSize),s,this.type)}toString(){return this.handle.toString()}write(r,s=0){for(let o=0;o<r.length;o++)this.set(o+s,r[o])}}t.Pointer=e})(A||(A={}));var A;(function(t){class e extends me{type;constructor(s,o){super(s),this.type=o}get value(){return t.read(this.handle,this.type)}set value(s){t.write(this.handle,s,this.type)}toString(){return this.isNull()?"null":`->${this.value}`}}t.Reference=e;function n(r,s){let o=Memory.alloc(Process.pointerSize);switch(typeof r){case"boolean":return new t.Reference(o.writeS8(+r),t.corlib.class("System.Boolean").type);case"number":switch(s?.enumValue){case t.Type.Enum.UBYTE:return new t.Reference(o.writeU8(r),s);case t.Type.Enum.BYTE:return new t.Reference(o.writeS8(r),s);case t.Type.Enum.CHAR:case t.Type.Enum.USHORT:return new t.Reference(o.writeU16(r),s);case t.Type.Enum.SHORT:return new t.Reference(o.writeS16(r),s);case t.Type.Enum.UINT:return new t.Reference(o.writeU32(r),s);case t.Type.Enum.INT:return new t.Reference(o.writeS32(r),s);case t.Type.Enum.ULONG:return new t.Reference(o.writeU64(r),s);case t.Type.Enum.LONG:return new t.Reference(o.writeS64(r),s);case t.Type.Enum.FLOAT:return new t.Reference(o.writeFloat(r),s);case t.Type.Enum.DOUBLE:return new t.Reference(o.writeDouble(r),s)}case"object":if(r instanceof t.ValueType||r instanceof t.Pointer)return new t.Reference(r.handle,r.type);if(r instanceof t.Object)return new t.Reference(o.writePointer(r),r.class.type);if(r instanceof t.String||r instanceof t.Array)return new t.Reference(o.writePointer(r),r.object.class.type);if(r instanceof NativePointer)switch(s?.enumValue){case t.Type.Enum.NUINT:case t.Type.Enum.NINT:return new t.Reference(o.writePointer(r),s)}else{if(r instanceof Int64)return new t.Reference(o.writeS64(r),t.corlib.class("System.Int64").type);if(r instanceof UInt64)return new t.Reference(o.writeU64(r),t.corlib.class("System.UInt64").type)}default:D(`couldn't create a reference to ${r} using an unhandled type ${s?.name}`)}}t.reference=n})(A||(A={}));var A;(function(t){class e extends me{get content(){return t.exports.stringGetChars(this).readUtf16String(this.length)}set content(s){let o=t.string("vfsfitvnm").handle.offsetOf(i=>i.readInt()==9)??D("couldn't find the length offset in the native string struct");globalThis.Object.defineProperty(t.String.prototype,"content",{set(i){t.exports.stringGetChars(this).writeUtf16String(i??""),this.handle.add(o).writeS32(i?.length??0)}}),this.content=s}get length(){return t.exports.stringGetLength(this)}get object(){return new t.Object(this)}toString(){return this.isNull()?"null":`"${this.content}"`}}t.String=e;function n(r){return new t.String(t.exports.stringNew(Memory.allocUtf8String(r??"")))}t.string=n})(A||(A={}));var A;(function(t){class e extends me{static fromId(r){return Process.runOnThread(r,()=>t.currentThread)}get id(){let r=function(){return this.internal.field("thread_id").value.toNumber()};if(Process.platform!="windows"){let s=Process.getCurrentThreadId(),i=ptr(r.apply(t.currentThread)).offsetOf(c=>c.readS32()==s,1024)??D("couldn't find the offset for determining the kernel id of a posix thread"),a=r;r=function(){let c=ptr(a.apply(this));return c.isNull()?(pt(`couldn't find thread id for ${this.handle}; returning a negative number, expect breakage`),-1):c.add(i).readS32()}}return ve(t.Thread.prototype,"id",r,S),this.id}get internal(){return this.object.tryField("internal_thread")?.value??this.object}get isFinalizer(){return!t.exports.threadIsVm(this)}get managedId(){return this.object.method("get_ManagedThreadId").invoke()}get object(){return new t.Object(this)}get staticData(){return this.internal.field("static_data").value}get synchronizationContext(){let s=(this.object.tryMethod("GetMutableExecutionContext")??this.object.method("get_ExecutionContext")).invoke();return(s.tryField("_syncContext")?.value??s.tryMethod("get_SynchronizationContext")?.invoke()??this.tryLocalValue(t.corlib.class("System.Threading.SynchronizationContext")))?.asNullable()??null}detach(){return t.exports.threadDetach(this)}schedule(r){let s=this.synchronizationContext?.tryMethod("Post");return s==null?Process.runOnThread(this.id,r):new Promise(o=>{let i=t.delegate(t.corlib.class("System.Threading.SendOrPostCallback"),()=>{let a=r();setImmediate(()=>o(a))});Script.bindWeak(globalThis,()=>{i.field("method_ptr").value=i.field("invoke_impl").value=t.exports.domainGet}),s.invoke(i,NULL)})}tryLocalValue(r){for(let s=0;s<16;s++){let o=this.staticData.add(s*Process.pointerSize).readPointer();if(!o.isNull()){let i=new t.Object(o.readPointer()).asNullable();if(i?.class?.isSubclassOf(r,!1))return i}}}}w([S],e.prototype,"internal",null),w([S],e.prototype,"isFinalizer",null),w([S],e.prototype,"managedId",null),w([S],e.prototype,"object",null),w([S],e.prototype,"staticData",null),w([S],e.prototype,"synchronizationContext",null),t.Thread=e,ve(t,"attachedThreads",()=>{if(t.exports.threadGetAttachedThreads.isNull()){let n=t.currentThread??D("current thread is not attached to IL2CPP"),r=n.handle.toMatchPattern(),s=function*(){try{yield*t.gc.heapSections}catch{}yield Process.getRangeByAddress(t.corlib.assembly.object),yield Process.getRangeByAddress(t.corlib.class("System.Threading.Thread").staticFieldsData),yield*Process.enumerateRanges("rw-").filter(o=>o.file==null)};for(let o of s()){let i=[];try{i=Memory.scanSync(o.base,o.size,r)}catch{}if(i.length==1){let a=[],c=l=>{let d=i[0].address.add(l*Process.pointerSize).readPointer();if(!d.isNull()&&Process.findRangeByAddress(d)!=null){let f=new t.Thread(d);if(f.object.class.equals(n.object.class))return a.push(f)}};for(let l=0;c(l);l--);a.reverse();for(let l=1;c(l);l++);return a}}D("couldn't collect attached threads")}return gn(t.exports.threadGetAttachedThreads).map(n=>new t.Thread(n))}),ve(t,"currentThread",()=>new t.Thread(t.exports.threadGetCurrent()).asNullable()),ve(t,"mainThread",()=>t.attachedThreads[0])})(A||(A={}));var A;(function(t){let e=class extends me{static get Enum(){let r=(o,i=a=>a)=>i(t.corlib.class(o)).type.enumValue,s={VOID:r("System.Void"),BOOLEAN:r("System.Boolean"),CHAR:r("System.Char"),BYTE:r("System.SByte"),UBYTE:r("System.Byte"),SHORT:r("System.Int16"),USHORT:r("System.UInt16"),INT:r("System.Int32"),UINT:r("System.UInt32"),LONG:r("System.Int64"),ULONG:r("System.UInt64"),NINT:r("System.IntPtr"),NUINT:r("System.UIntPtr"),FLOAT:r("System.Single"),DOUBLE:r("System.Double"),POINTER:r("System.IntPtr",o=>o.field("m_value")),VALUE_TYPE:r("System.Decimal"),OBJECT:r("System.Object"),STRING:r("System.String"),CLASS:r("System.Array"),ARRAY:r("System.Void",o=>o.arrayClass),NARRAY:r("System.Void",o=>new t.Class(t.exports.classGetArrayClass(o,2))),GENERIC_INSTANCE:r("System.Int32",o=>o.interfaces.find(i=>i.name.endsWith("`1")))};return Reflect.defineProperty(this,"Enum",{value:s}),hi({...s,VAR:r("System.Action`1",o=>o.generics[0]),MVAR:r("System.Array",o=>o.method("AsReadOnly",1).generics[0])})}get class(){return new t.Class(t.exports.typeGetClass(this))}get fridaAlias(){function r(s){let o=s.class.fields.filter(i=>!i.isStatic);return o.length==0?["char"]:o.map(i=>i.type.fridaAlias)}if(this.isByReference)return"pointer";switch(this.enumValue){case t.Type.Enum.VOID:return"void";case t.Type.Enum.BOOLEAN:return"bool";case t.Type.Enum.CHAR:return"uchar";case t.Type.Enum.BYTE:return"int8";case t.Type.Enum.UBYTE:return"uint8";case t.Type.Enum.SHORT:return"int16";case t.Type.Enum.USHORT:return"uint16";case t.Type.Enum.INT:return"int32";case t.Type.Enum.UINT:return"uint32";case t.Type.Enum.LONG:return"int64";case t.Type.Enum.ULONG:return"uint64";case t.Type.Enum.FLOAT:return"float";case t.Type.Enum.DOUBLE:return"double";case t.Type.Enum.NINT:case t.Type.Enum.NUINT:case t.Type.Enum.POINTER:case t.Type.Enum.STRING:case t.Type.Enum.ARRAY:case t.Type.Enum.NARRAY:return"pointer";case t.Type.Enum.VALUE_TYPE:return this.class.isEnum?this.class.baseType.fridaAlias:r(this);case t.Type.Enum.CLASS:case t.Type.Enum.OBJECT:case t.Type.Enum.GENERIC_INSTANCE:return this.class.isStruct?r(this):this.class.isEnum?this.class.baseType.fridaAlias:"pointer";default:return"pointer"}}get isByReference(){return this.name.endsWith("&")}get isPrimitive(){switch(this.enumValue){case t.Type.Enum.BOOLEAN:case t.Type.Enum.CHAR:case t.Type.Enum.BYTE:case t.Type.Enum.UBYTE:case t.Type.Enum.SHORT:case t.Type.Enum.USHORT:case t.Type.Enum.INT:case t.Type.Enum.UINT:case t.Type.Enum.LONG:case t.Type.Enum.ULONG:case t.Type.Enum.FLOAT:case t.Type.Enum.DOUBLE:case t.Type.Enum.NINT:case t.Type.Enum.NUINT:return!0;default:return!1}}get name(){let r=t.exports.typeGetName(this);try{return r.readUtf8String()}finally{t.free(r)}}get object(){return new t.Object(t.exports.typeGetObject(this))}get enumValue(){return t.exports.typeGetTypeEnum(this)}is(r){return t.exports.typeEquals.isNull()?this.object.method("Equals").invoke(r.object):!!t.exports.typeEquals(this,r)}toString(){return this.name}};w([S],e.prototype,"class",null),w([S],e.prototype,"fridaAlias",null),w([S],e.prototype,"isByReference",null),w([S],e.prototype,"isPrimitive",null),w([S],e.prototype,"name",null),w([S],e.prototype,"object",null),w([S],e.prototype,"enumValue",null),w([S],e,"Enum",null),e=w([mt],e),t.Type=e})(A||(A={}));var A;(function(t){class e extends me{type;constructor(r,s){super(r),this.type=s}box(){return new t.Object(t.exports.valueTypeBox(this.type.class,this))}field(r){return this.tryField(r)??D(`couldn't find non-static field ${r} in hierarchy of class ${this.type.name}`)}method(r,s=-1){return this.tryMethod(r,s)??D(`couldn't find non-static method ${r} in hierarchy of class ${this.type.name}`)}tryField(r){let s=this.type.class.tryField(r);if(s?.isStatic){for(let o of this.type.class.hierarchy())for(let i of o.fields)if(i.name==r&&!i.isStatic)return i.bind(this);return}return s?.bind(this)}tryMethod(r,s=-1){let o=this.type.class.tryMethod(r,s);if(o?.isStatic){for(let i of this.type.class.hierarchy())for(let a of i.methods)if(a.name==r&&!a.isStatic&&(s<0||a.parameterCount==s))return a.bind(this);return}return o?.bind(this)}toString(){let r=this.method("ToString",0);return this.isNull()?"null":r.class.isValueType?r.invoke().content??"null":this.box().toString()??"null"}}t.ValueType=e})(A||(A={}));globalThis.Il2Cpp=A;var Yt={};Fo(Yt,{ArtMethod:()=>Bt,ArtStackVisitor:()=>Yn,DVM_JNI_ENV_OFFSET_SELF:()=>Ns,HandleVector:()=>vt,VariableSizedHandleScope:()=>wt,backtrace:()=>fr,deoptimizeBootImage:()=>gr,deoptimizeEverything:()=>_r,deoptimizeMethod:()=>mr,ensureClassInitialized:()=>Fc,getAndroidApiLevel:()=>le,getAndroidVersion:()=>Tt,getApi:()=>Z,getArtApexVersion:()=>or,getArtClassSpec:()=>ar,getArtFieldSpec:()=>Wt,getArtMethodSpec:()=>xe,getArtThreadFromEnv:()=>Kt,getArtThreadSpec:()=>rt,makeArtClassLoaderVisitor:()=>ur,makeArtClassVisitor:()=>dr,makeMethodMangler:()=>Ml,makeObjectVisitorPredicate:()=>br,revertGlobalPatches:()=>hr,translateMethod:()=>kl,withAllArtThreadsSuspended:()=>lr,withRunnableArtThread:()=>Me});var{pageSize:yn,pointerSize:pi}=Process,bn=class{constructor(e){this.sliceSize=e,this.slicesPerPage=yn/e,this.pages=[],this.free=[]}allocateSlice(e,n){let r=e.near===void 0,s=n===1;if(r&&s){let o=this.free.pop();if(o!==void 0)return o}else if(n<yn){let{free:o}=this,i=o.length,a=s?null:ptr(n-1);for(let c=0;c!==i;c++){let l=o[c],d=r||this._isSliceNear(l,e),f=s||l.and(a).isNull();if(d&&f)return o.splice(c,1)[0]}}return this._allocatePage(e)}_allocatePage(e){let n=Memory.alloc(yn,e),{sliceSize:r,slicesPerPage:s}=this;for(let o=1;o!==s;o++){let i=n.add(o*r);this.free.push(i)}return this.pages.push(n),n}_isSliceNear(e,n){let r=e.add(this.sliceSize),{near:s,maxDistance:o}=n,i=as(s.sub(e)),a=as(s.sub(r));return i.compare(o)<=0&&a.compare(o)<=0}freeSlice(e){this.free.push(e)}};function as(t){let e=pi===4?31:63,n=ptr(1).shl(e).not();return t.and(n)}function En(t){return new bn(t)}function be(t,e){if(e!==0)throw new Error(t+" failed: "+e)}var Rt={v1_0:805371904,v1_2:805372416},Pt={canTagObjects:1},{pointerSize:mi}=Process,_i={exceptions:"propagate"};function Ue(t,e){this.handle=t,this.vm=e,this.vtable=t.readPointer()}Ue.prototype.deallocate=_t(47,"int32",["pointer","pointer"],function(t,e){return t(this.handle,e)});Ue.prototype.getLoadedClasses=_t(78,"int32",["pointer","pointer","pointer"],function(t,e,n){let r=t(this.handle,e,n);be("EnvJvmti::getLoadedClasses",r)});Ue.prototype.iterateOverInstancesOfClass=_t(112,"int32",["pointer","pointer","int","pointer","pointer"],function(t,e,n,r,s){let o=t(this.handle,e,n,r,s);be("EnvJvmti::iterateOverInstancesOfClass",o)});Ue.prototype.getObjectsWithTags=_t(114,"int32",["pointer","int","pointer","pointer","pointer","pointer"],function(t,e,n,r,s,o){let i=t(this.handle,e,n,r,s,o);be("EnvJvmti::getObjectsWithTags",i)});Ue.prototype.addCapabilities=_t(142,"int32",["pointer","pointer"],function(t,e){return t(this.handle,e)});function _t(t,e,n,r){let s=null;return function(){s===null&&(s=new NativeFunction(this.vtable.add((t-1)*mi).readPointer(),e,n,_i));let o=[s];return o=o.concat.apply(o,arguments),r.apply(this,o)}}function De(t,e,{limit:n}){let r=t,s=null;for(let o=0;o!==n;o++){let i=Instruction.parse(r),a=e(i,s);if(a!==null)return a;r=i.next,s=i}return null}function ye(t){let e=null,n=!1;return function(...r){return n||(e=t(...r),n=!0),e}}function b(t,e){this.handle=t,this.vm=e}var It=Process.pointerSize,Ve=2,gi=28,yi=34,bi=37,Ei=40,Si=43,vi=46,wi=49,Ti=52,xi=55,Ai=58,Ni=61,Li=64,Mi=67,ki=70,ji=73,Oi=76,Ri=79,Pi=82,Ii=85,Fi=88,Ci=91,Ui=114,Di=117,zi=120,Gi=123,Vi=126,Bi=129,$i=132,Ji=135,Hi=138,Zi=141,qi=95,Wi=96,Ki=97,Yi=98,Qi=99,Xi=100,ea=101,ta=102,na=103,ra=104,sa=105,oa=106,ia=107,aa=108,ca=109,la=110,da=111,ua=112,fa=145,ha=146,pa=147,ma=148,_a=149,ga=150,ya=151,ba=152,Ea=153,Sa=154,va=155,wa=156,Ta=157,xa=158,Aa=159,Na=160,La=161,Ma=162,ka={pointer:yi,uint8:bi,int8:Ei,uint16:Si,int16:vi,int32:wi,int64:Ti,float:xi,double:Ai,void:Ni},ja={pointer:Li,uint8:Mi,int8:ki,uint16:ji,int16:Oi,int32:Ri,int64:Pi,float:Ii,double:Fi,void:Ci},Oa={pointer:Ui,uint8:Di,int8:zi,uint16:Gi,int16:Vi,int32:Bi,int64:$i,float:Ji,double:Hi,void:Zi},Ra={pointer:qi,uint8:Wi,int8:Ki,uint16:Yi,int16:Qi,int32:Xi,int64:ea,float:ta,double:na},Pa={pointer:ra,uint8:sa,int8:oa,uint16:ia,int16:aa,int32:ca,int64:la,float:da,double:ua},Ia={pointer:fa,uint8:ha,int8:pa,uint16:ma,int16:_a,int32:ga,int64:ya,float:ba,double:Ea},Fa={pointer:Sa,uint8:va,int8:wa,uint16:Ta,int16:xa,int32:Aa,int64:Na,float:La,double:Ma},ls={exceptions:"propagate"},Sn=null,On=[];b.dispose=function(t){On.forEach(t.deleteGlobalRef,t),On=[]};function He(t){return On.push(t),t}function Ft(t){return Sn===null&&(Sn=t.handle.readPointer()),Sn}function j(t,e,n,r){let s=null;return function(){s===null&&(s=new NativeFunction(Ft(this).add(t*It).readPointer(),e,n,ls));let o=[s];return o=o.concat.apply(o,arguments),r.apply(this,o)}}b.prototype.getVersion=j(4,"int32",["pointer"],function(t){return t(this.handle)});b.prototype.findClass=j(6,"pointer",["pointer","pointer"],function(t,e){let n=t(this.handle,Memory.allocUtf8String(e));return this.throwIfExceptionPending(),n});b.prototype.throwIfExceptionPending=function(){let t=this.exceptionOccurred();if(t.isNull())return;this.exceptionClear();let e=this.newGlobalRef(t);this.deleteLocalRef(t);let n=this.vaMethod("pointer",[])(this.handle,e,this.javaLangObject().toString),r=this.stringFromJni(n);this.deleteLocalRef(n);let s=new Error(r);throw s.$h=e,Script.bindWeak(s,Ca(this.vm,e)),s};function Ca(t,e){return function(){t.perform(n=>{n.deleteGlobalRef(e)})}}b.prototype.fromReflectedMethod=j(7,"pointer",["pointer","pointer"],function(t,e){return t(this.handle,e)});b.prototype.fromReflectedField=j(8,"pointer",["pointer","pointer"],function(t,e){return t(this.handle,e)});b.prototype.toReflectedMethod=j(9,"pointer",["pointer","pointer","pointer","uint8"],function(t,e,n,r){return t(this.handle,e,n,r)});b.prototype.getSuperclass=j(10,"pointer",["pointer","pointer"],function(t,e){return t(this.handle,e)});b.prototype.isAssignableFrom=j(11,"uint8",["pointer","pointer","pointer"],function(t,e,n){return!!t(this.handle,e,n)});b.prototype.toReflectedField=j(12,"pointer",["pointer","pointer","pointer","uint8"],function(t,e,n,r){return t(this.handle,e,n,r)});b.prototype.throw=j(13,"int32",["pointer","pointer"],function(t,e){return t(this.handle,e)});b.prototype.exceptionOccurred=j(15,"pointer",["pointer"],function(t){return t(this.handle)});b.prototype.exceptionDescribe=j(16,"void",["pointer"],function(t){t(this.handle)});b.prototype.exceptionClear=j(17,"void",["pointer"],function(t){t(this.handle)});b.prototype.pushLocalFrame=j(19,"int32",["pointer","int32"],function(t,e){return t(this.handle,e)});b.prototype.popLocalFrame=j(20,"pointer",["pointer","pointer"],function(t,e){return t(this.handle,e)});b.prototype.newGlobalRef=j(21,"pointer",["pointer","pointer"],function(t,e){return t(this.handle,e)});b.prototype.deleteGlobalRef=j(22,"void",["pointer","pointer"],function(t,e){t(this.handle,e)});b.prototype.deleteLocalRef=j(23,"void",["pointer","pointer"],function(t,e){t(this.handle,e)});b.prototype.isSameObject=j(24,"uint8",["pointer","pointer","pointer"],function(t,e,n){return!!t(this.handle,e,n)});b.prototype.newLocalRef=j(25,"pointer",["pointer","pointer"],function(t,e){return t(this.handle,e)});b.prototype.allocObject=j(27,"pointer",["pointer","pointer"],function(t,e){return t(this.handle,e)});b.prototype.getObjectClass=j(31,"pointer",["pointer","pointer"],function(t,e){return t(this.handle,e)});b.prototype.isInstanceOf=j(32,"uint8",["pointer","pointer","pointer"],function(t,e,n){return!!t(this.handle,e,n)});b.prototype.getMethodId=j(33,"pointer",["pointer","pointer","pointer","pointer"],function(t,e,n,r){return t(this.handle,e,Memory.allocUtf8String(n),Memory.allocUtf8String(r))});b.prototype.getFieldId=j(94,"pointer",["pointer","pointer","pointer","pointer"],function(t,e,n,r){return t(this.handle,e,Memory.allocUtf8String(n),Memory.allocUtf8String(r))});b.prototype.getIntField=j(100,"int32",["pointer","pointer","pointer"],function(t,e,n){return t(this.handle,e,n)});b.prototype.getStaticMethodId=j(113,"pointer",["pointer","pointer","pointer","pointer"],function(t,e,n,r){return t(this.handle,e,Memory.allocUtf8String(n),Memory.allocUtf8String(r))});b.prototype.getStaticFieldId=j(144,"pointer",["pointer","pointer","pointer","pointer"],function(t,e,n,r){return t(this.handle,e,Memory.allocUtf8String(n),Memory.allocUtf8String(r))});b.prototype.getStaticIntField=j(150,"int32",["pointer","pointer","pointer"],function(t,e,n){return t(this.handle,e,n)});b.prototype.getStringLength=j(164,"int32",["pointer","pointer"],function(t,e){return t(this.handle,e)});b.prototype.getStringChars=j(165,"pointer",["pointer","pointer","pointer"],function(t,e){return t(this.handle,e,NULL)});b.prototype.releaseStringChars=j(166,"void",["pointer","pointer","pointer"],function(t,e,n){t(this.handle,e,n)});b.prototype.newStringUtf=j(167,"pointer",["pointer","pointer"],function(t,e){let n=Memory.allocUtf8String(e);return t(this.handle,n)});b.prototype.getStringUtfChars=j(169,"pointer",["pointer","pointer","pointer"],function(t,e){return t(this.handle,e,NULL)});b.prototype.releaseStringUtfChars=j(170,"void",["pointer","pointer","pointer"],function(t,e,n){t(this.handle,e,n)});b.prototype.getArrayLength=j(171,"int32",["pointer","pointer"],function(t,e){return t(this.handle,e)});b.prototype.newObjectArray=j(172,"pointer",["pointer","int32","pointer","pointer"],function(t,e,n,r){return t(this.handle,e,n,r)});b.prototype.getObjectArrayElement=j(173,"pointer",["pointer","pointer","int32"],function(t,e,n){return t(this.handle,e,n)});b.prototype.setObjectArrayElement=j(174,"void",["pointer","pointer","int32","pointer"],function(t,e,n,r){t(this.handle,e,n,r)});b.prototype.newBooleanArray=j(175,"pointer",["pointer","int32"],function(t,e){return t(this.handle,e)});b.prototype.newByteArray=j(176,"pointer",["pointer","int32"],function(t,e){return t(this.handle,e)});b.prototype.newCharArray=j(177,"pointer",["pointer","int32"],function(t,e){return t(this.handle,e)});b.prototype.newShortArray=j(178,"pointer",["pointer","int32"],function(t,e){return t(this.handle,e)});b.prototype.newIntArray=j(179,"pointer",["pointer","int32"],function(t,e){return t(this.handle,e)});b.prototype.newLongArray=j(180,"pointer",["pointer","int32"],function(t,e){return t(this.handle,e)});b.prototype.newFloatArray=j(181,"pointer",["pointer","int32"],function(t,e){return t(this.handle,e)});b.prototype.newDoubleArray=j(182,"pointer",["pointer","int32"],function(t,e){return t(this.handle,e)});b.prototype.getBooleanArrayElements=j(183,"pointer",["pointer","pointer","pointer"],function(t,e){return t(this.handle,e,NULL)});b.prototype.getByteArrayElements=j(184,"pointer",["pointer","pointer","pointer"],function(t,e){return t(this.handle,e,NULL)});b.prototype.getCharArrayElements=j(185,"pointer",["pointer","pointer","pointer"],function(t,e){return t(this.handle,e,NULL)});b.prototype.getShortArrayElements=j(186,"pointer",["pointer","pointer","pointer"],function(t,e){return t(this.handle,e,NULL)});b.prototype.getIntArrayElements=j(187,"pointer",["pointer","pointer","pointer"],function(t,e){return t(this.handle,e,NULL)});b.prototype.getLongArrayElements=j(188,"pointer",["pointer","pointer","pointer"],function(t,e){return t(this.handle,e,NULL)});b.prototype.getFloatArrayElements=j(189,"pointer",["pointer","pointer","pointer"],function(t,e){return t(this.handle,e,NULL)});b.prototype.getDoubleArrayElements=j(190,"pointer",["pointer","pointer","pointer"],function(t,e){return t(this.handle,e,NULL)});b.prototype.releaseBooleanArrayElements=j(191,"pointer",["pointer","pointer","pointer","int32"],function(t,e,n){t(this.handle,e,n,Ve)});b.prototype.releaseByteArrayElements=j(192,"pointer",["pointer","pointer","pointer","int32"],function(t,e,n){t(this.handle,e,n,Ve)});b.prototype.releaseCharArrayElements=j(193,"pointer",["pointer","pointer","pointer","int32"],function(t,e,n){t(this.handle,e,n,Ve)});b.prototype.releaseShortArrayElements=j(194,"pointer",["pointer","pointer","pointer","int32"],function(t,e,n){t(this.handle,e,n,Ve)});b.prototype.releaseIntArrayElements=j(195,"pointer",["pointer","pointer","pointer","int32"],function(t,e,n){t(this.handle,e,n,Ve)});b.prototype.releaseLongArrayElements=j(196,"pointer",["pointer","pointer","pointer","int32"],function(t,e,n){t(this.handle,e,n,Ve)});b.prototype.releaseFloatArrayElements=j(197,"pointer",["pointer","pointer","pointer","int32"],function(t,e,n){t(this.handle,e,n,Ve)});b.prototype.releaseDoubleArrayElements=j(198,"pointer",["pointer","pointer","pointer","int32"],function(t,e,n){t(this.handle,e,n,Ve)});b.prototype.getByteArrayRegion=j(200,"void",["pointer","pointer","int","int","pointer"],function(t,e,n,r,s){t(this.handle,e,n,r,s)});b.prototype.setBooleanArrayRegion=j(207,"void",["pointer","pointer","int32","int32","pointer"],function(t,e,n,r,s){t(this.handle,e,n,r,s)});b.prototype.setByteArrayRegion=j(208,"void",["pointer","pointer","int32","int32","pointer"],function(t,e,n,r,s){t(this.handle,e,n,r,s)});b.prototype.setCharArrayRegion=j(209,"void",["pointer","pointer","int32","int32","pointer"],function(t,e,n,r,s){t(this.handle,e,n,r,s)});b.prototype.setShortArrayRegion=j(210,"void",["pointer","pointer","int32","int32","pointer"],function(t,e,n,r,s){t(this.handle,e,n,r,s)});b.prototype.setIntArrayRegion=j(211,"void",["pointer","pointer","int32","int32","pointer"],function(t,e,n,r,s){t(this.handle,e,n,r,s)});b.prototype.setLongArrayRegion=j(212,"void",["pointer","pointer","int32","int32","pointer"],function(t,e,n,r,s){t(this.handle,e,n,r,s)});b.prototype.setFloatArrayRegion=j(213,"void",["pointer","pointer","int32","int32","pointer"],function(t,e,n,r,s){t(this.handle,e,n,r,s)});b.prototype.setDoubleArrayRegion=j(214,"void",["pointer","pointer","int32","int32","pointer"],function(t,e,n,r,s){t(this.handle,e,n,r,s)});b.prototype.registerNatives=j(215,"int32",["pointer","pointer","pointer","int32"],function(t,e,n,r){return t(this.handle,e,n,r)});b.prototype.monitorEnter=j(217,"int32",["pointer","pointer"],function(t,e){return t(this.handle,e)});b.prototype.monitorExit=j(218,"int32",["pointer","pointer"],function(t,e){return t(this.handle,e)});b.prototype.getDirectBufferAddress=j(230,"pointer",["pointer","pointer"],function(t,e){return t(this.handle,e)});b.prototype.getObjectRefType=j(232,"int32",["pointer","pointer"],function(t,e){return t(this.handle,e)});var cs=new Map;function Ct(t,e,n,r){return Pn(this,"p",Da,t,e,n,r)}function Rn(t,e,n,r){return Pn(this,"v",za,t,e,n,r)}function Ua(t,e,n,r){return Pn(this,"n",Ga,t,e,n,r)}function Pn(t,e,n,r,s,o,i){if(i!==void 0)return n(t,r,s,o,i);let a=[r,e,s].concat(o).join("|"),c=cs.get(a);return c===void 0&&(c=n(t,r,s,o,ls),cs.set(a,c)),c}function Da(t,e,n,r,s){return new NativeFunction(Ft(t).add(e*It).readPointer(),n,["pointer","pointer","pointer"].concat(r),s)}function za(t,e,n,r,s){return new NativeFunction(Ft(t).add(e*It).readPointer(),n,["pointer","pointer","pointer","..."].concat(r),s)}function Ga(t,e,n,r,s){return new NativeFunction(Ft(t).add(e*It).readPointer(),n,["pointer","pointer","pointer","pointer","..."].concat(r),s)}b.prototype.constructor=function(t,e){return Rn.call(this,gi,"pointer",t,e)};b.prototype.vaMethod=function(t,e,n){let r=ka[t];if(r===void 0)throw new Error("Unsupported type: "+t);return Rn.call(this,r,t,e,n)};b.prototype.nonvirtualVaMethod=function(t,e,n){let r=ja[t];if(r===void 0)throw new Error("Unsupported type: "+t);return Ua.call(this,r,t,e,n)};b.prototype.staticVaMethod=function(t,e,n){let r=Oa[t];if(r===void 0)throw new Error("Unsupported type: "+t);return Rn.call(this,r,t,e,n)};b.prototype.getField=function(t){let e=Ra[t];if(e===void 0)throw new Error("Unsupported type: "+t);return Ct.call(this,e,t,[])};b.prototype.getStaticField=function(t){let e=Ia[t];if(e===void 0)throw new Error("Unsupported type: "+t);return Ct.call(this,e,t,[])};b.prototype.setField=function(t){let e=Pa[t];if(e===void 0)throw new Error("Unsupported type: "+t);return Ct.call(this,e,"void",[t])};b.prototype.setStaticField=function(t){let e=Fa[t];if(e===void 0)throw new Error("Unsupported type: "+t);return Ct.call(this,e,"void",[t])};var vn=null;b.prototype.javaLangClass=function(){if(vn===null){let t=this.findClass("java/lang/Class");try{let e=this.getMethodId.bind(this,t);vn={handle:He(this.newGlobalRef(t)),getName:e("getName","()Ljava/lang/String;"),getSimpleName:e("getSimpleName","()Ljava/lang/String;"),getGenericSuperclass:e("getGenericSuperclass","()Ljava/lang/reflect/Type;"),getDeclaredConstructors:e("getDeclaredConstructors","()[Ljava/lang/reflect/Constructor;"),getDeclaredMethods:e("getDeclaredMethods","()[Ljava/lang/reflect/Method;"),getDeclaredFields:e("getDeclaredFields","()[Ljava/lang/reflect/Field;"),isArray:e("isArray","()Z"),isPrimitive:e("isPrimitive","()Z"),isInterface:e("isInterface","()Z"),getComponentType:e("getComponentType","()Ljava/lang/Class;")}}finally{this.deleteLocalRef(t)}}return vn};var wn=null;b.prototype.javaLangObject=function(){if(wn===null){let t=this.findClass("java/lang/Object");try{let e=this.getMethodId.bind(this,t);wn={handle:He(this.newGlobalRef(t)),toString:e("toString","()Ljava/lang/String;"),getClass:e("getClass","()Ljava/lang/Class;")}}finally{this.deleteLocalRef(t)}}return wn};var Tn=null;b.prototype.javaLangReflectConstructor=function(){if(Tn===null){let t=this.findClass("java/lang/reflect/Constructor");try{Tn={getGenericParameterTypes:this.getMethodId(t,"getGenericParameterTypes","()[Ljava/lang/reflect/Type;")}}finally{this.deleteLocalRef(t)}}return Tn};var xn=null;b.prototype.javaLangReflectMethod=function(){if(xn===null){let t=this.findClass("java/lang/reflect/Method");try{let e=this.getMethodId.bind(this,t);xn={getName:e("getName","()Ljava/lang/String;"),getGenericParameterTypes:e("getGenericParameterTypes","()[Ljava/lang/reflect/Type;"),getParameterTypes:e("getParameterTypes","()[Ljava/lang/Class;"),getGenericReturnType:e("getGenericReturnType","()Ljava/lang/reflect/Type;"),getGenericExceptionTypes:e("getGenericExceptionTypes","()[Ljava/lang/reflect/Type;"),getModifiers:e("getModifiers","()I"),isVarArgs:e("isVarArgs","()Z")}}finally{this.deleteLocalRef(t)}}return xn};var An=null;b.prototype.javaLangReflectField=function(){if(An===null){let t=this.findClass("java/lang/reflect/Field");try{let e=this.getMethodId.bind(this,t);An={getName:e("getName","()Ljava/lang/String;"),getType:e("getType","()Ljava/lang/Class;"),getGenericType:e("getGenericType","()Ljava/lang/reflect/Type;"),getModifiers:e("getModifiers","()I"),toString:e("toString","()Ljava/lang/String;")}}finally{this.deleteLocalRef(t)}}return An};var Nn=null;b.prototype.javaLangReflectTypeVariable=function(){if(Nn===null){let t=this.findClass("java/lang/reflect/TypeVariable");try{let e=this.getMethodId.bind(this,t);Nn={handle:He(this.newGlobalRef(t)),getName:e("getName","()Ljava/lang/String;"),getBounds:e("getBounds","()[Ljava/lang/reflect/Type;"),getGenericDeclaration:e("getGenericDeclaration","()Ljava/lang/reflect/GenericDeclaration;")}}finally{this.deleteLocalRef(t)}}return Nn};var Ln=null;b.prototype.javaLangReflectWildcardType=function(){if(Ln===null){let t=this.findClass("java/lang/reflect/WildcardType");try{let e=this.getMethodId.bind(this,t);Ln={handle:He(this.newGlobalRef(t)),getLowerBounds:e("getLowerBounds","()[Ljava/lang/reflect/Type;"),getUpperBounds:e("getUpperBounds","()[Ljava/lang/reflect/Type;")}}finally{this.deleteLocalRef(t)}}return Ln};var Mn=null;b.prototype.javaLangReflectGenericArrayType=function(){if(Mn===null){let t=this.findClass("java/lang/reflect/GenericArrayType");try{Mn={handle:He(this.newGlobalRef(t)),getGenericComponentType:this.getMethodId(t,"getGenericComponentType","()Ljava/lang/reflect/Type;")}}finally{this.deleteLocalRef(t)}}return Mn};var kn=null;b.prototype.javaLangReflectParameterizedType=function(){if(kn===null){let t=this.findClass("java/lang/reflect/ParameterizedType");try{let e=this.getMethodId.bind(this,t);kn={handle:He(this.newGlobalRef(t)),getActualTypeArguments:e("getActualTypeArguments","()[Ljava/lang/reflect/Type;"),getRawType:e("getRawType","()Ljava/lang/reflect/Type;"),getOwnerType:e("getOwnerType","()Ljava/lang/reflect/Type;")}}finally{this.deleteLocalRef(t)}}return kn};var jn=null;b.prototype.javaLangString=function(){if(jn===null){let t=this.findClass("java/lang/String");try{jn={handle:He(this.newGlobalRef(t))}}finally{this.deleteLocalRef(t)}}return jn};b.prototype.getClassName=function(t){let e=this.vaMethod("pointer",[])(this.handle,t,this.javaLangClass().getName);try{return this.stringFromJni(e)}finally{this.deleteLocalRef(e)}};b.prototype.getObjectClassName=function(t){let e=this.getObjectClass(t);try{return this.getClassName(e)}finally{this.deleteLocalRef(e)}};b.prototype.getActualTypeArgument=function(t){let e=this.vaMethod("pointer",[])(this.handle,t,this.javaLangReflectParameterizedType().getActualTypeArguments);if(this.throwIfExceptionPending(),!e.isNull())try{return this.getTypeNameFromFirstTypeElement(e)}finally{this.deleteLocalRef(e)}};b.prototype.getTypeNameFromFirstTypeElement=function(t){if(this.getArrayLength(t)>0){let n=this.getObjectArrayElement(t,0);try{return this.getTypeName(n)}finally{this.deleteLocalRef(n)}}else return"java.lang.Object"};b.prototype.getTypeName=function(t,e){let n=this.vaMethod("pointer",[]);if(this.isInstanceOf(t,this.javaLangClass().handle))return this.getClassName(t);if(this.isInstanceOf(t,this.javaLangReflectGenericArrayType().handle))return this.getArrayTypeName(t);if(this.isInstanceOf(t,this.javaLangReflectParameterizedType().handle)){let r=n(this.handle,t,this.javaLangReflectParameterizedType().getRawType);this.throwIfExceptionPending();let s;try{s=this.getTypeName(r)}finally{this.deleteLocalRef(r)}return e&&(s+="<"+this.getActualTypeArgument(t)+">"),s}else return this.isInstanceOf(t,this.javaLangReflectTypeVariable().handle)||this.isInstanceOf(t,this.javaLangReflectWildcardType().handle),"java.lang.Object"};b.prototype.getArrayTypeName=function(t){let e=this.vaMethod("pointer",[]);if(this.isInstanceOf(t,this.javaLangClass().handle))return this.getClassName(t);if(this.isInstanceOf(t,this.javaLangReflectGenericArrayType().handle)){let n=e(this.handle,t,this.javaLangReflectGenericArrayType().getGenericComponentType);this.throwIfExceptionPending();try{return"[L"+this.getTypeName(n)+";"}finally{this.deleteLocalRef(n)}}else return"[Ljava.lang.Object;"};b.prototype.stringFromJni=function(t){let e=this.getStringChars(t);if(e.isNull())throw new Error("Unable to access string");try{let n=this.getStringLength(t);return e.readUtf16String(n)}finally{this.releaseStringChars(t,e)}};var ds=65542,tt=Process.pointerSize,In=Process.getCurrentThreadId(),Ze=new Map,gt=new Map;function Pe(t){let e=t.vm,n=null,r=null,s=null;function o(){let a=e.readPointer(),c={exceptions:"propagate"};n=new NativeFunction(a.add(4*tt).readPointer(),"int32",["pointer","pointer","pointer"],c),r=new NativeFunction(a.add(5*tt).readPointer(),"int32",["pointer"],c),s=new NativeFunction(a.add(6*tt).readPointer(),"int32",["pointer","pointer","int32"],c)}this.handle=e,this.perform=function(a){let c=Process.getCurrentThreadId(),l=i(c);if(l!==null)return a(l);let d=this._tryGetEnv(),f=d!==null;f||(d=this.attachCurrentThread(),Ze.set(c,!0)),this.link(c,d);try{return a(d)}finally{let h=c===In;if(h||this.unlink(c),!f&&!h){let u=Ze.get(c);Ze.delete(c),u&&this.detachCurrentThread()}}},this.attachCurrentThread=function(){let a=Memory.alloc(tt);return be("VM::AttachCurrentThread",n(e,a,NULL)),new b(a.readPointer(),this)},this.detachCurrentThread=function(){be("VM::DetachCurrentThread",r(e))},this.preventDetachDueToClassLoader=function(){let a=Process.getCurrentThreadId();Ze.has(a)&&Ze.set(a,!1)},this.getEnv=function(){let a=i(Process.getCurrentThreadId());if(a!==null)return a;let c=Memory.alloc(tt),l=s(e,c,ds);if(l===-2)throw new Error("Current thread is not attached to the Java VM; please move this code inside a Java.perform() callback");return be("VM::GetEnv",l),new b(c.readPointer(),this)},this.tryGetEnv=function(){let a=i(Process.getCurrentThreadId());return a!==null?a:this._tryGetEnv()},this._tryGetEnv=function(){let a=this.tryGetEnvHandle(ds);return a===null?null:new b(a,this)},this.tryGetEnvHandle=function(a){let c=Memory.alloc(tt);return s(e,c,a)!==0?null:c.readPointer()},this.makeHandleDestructor=function(a){return()=>{this.perform(c=>{c.deleteGlobalRef(a)})}},this.link=function(a,c){let l=gt.get(a);l===void 0?gt.set(a,[c,1]):l[1]++},this.unlink=function(a){let c=gt.get(a);c[1]===1?gt.delete(a):c[1]--};function i(a){let c=gt.get(a);return c===void 0?null:c[0]}o.call(this)}Pe.dispose=function(t){Ze.get(In)===!0&&(Ze.delete(In),t.detachCurrentThread())};var Va=4,x=Process.pointerSize,{readU32:Ba,readPointer:$a,writeU32:Ja,writePointer:Ha}=NativePointer.prototype,Za=1,qa=8,Wa=16,Gt=256,Ka=524288,Ya=2097152,As=1073741824,Qa=524288,Xa=134217728,Hn=1048576,ec=2097152,tc=268435456,nc=268435456,rc=0,Zn=3,qn=5,sr=ptr(1).not(),sc=2147467263,oc=4294963200,qt=17*x,ic=18*x,Ns=12,ac=112,cc=116,lc=0,Cn=56,us=4,dc=8,uc=10,fc=12,hc=14,pc=28,mc=36,_c=0,gc=1,yc=2,bc=3,Ec=4,Sc=5,vc=6,wc=7,fs=2147483648,Tc=28,St=3*x,xc=3*x,Ac=1,Nc=1,Ls=ye(Uc),Lc=ye(Yc),xe=ye(Xc),rt=ye(el),Mc=ye(tl),kc=ye(dl),Tt=ye(ol),Ms=ye(il),le=ye(al),or=ye(cl),jc=ye(pl),Oc=Process.arch==="ia32"?ed:Xl,X={exceptions:"propagate"},yt={},Un=null,Dn=null,ks=null,fe=null,ir=[],Vt=new Map,js=[],zn=null,hs=0,ps=!1,ms=!1,bt=null,Rc=[],Gn=null,Ut=null;function Z(){return Un===null&&(Un=Pc()),Un}function Pc(){let t=Process.enumerateModules().filter(u=>/^lib(art|dvm).so$/.test(u.name)).filter(u=>!/\/system\/fake-libs/.test(u.path));if(t.length===0)return null;let e=t[0],n=e.name.indexOf("art")!==-1?"art":"dalvik",r=n==="art",s={module:e,find(u){let{module:m}=this,p=m.findExportByName(u);return p===null&&(p=m.findSymbolByName(u)),p},flavor:n,addLocalReference:null};s.isApiLevel34OrApexEquivalent=r&&(s.find("_ZN3art7AppInfo29GetPrimaryApkReferenceProfileEv")!==null||s.find("_ZN3art6Thread15RunFlipFunctionEPS0_")!==null);let o=r?{functions:{JNI_GetCreatedJavaVMs:["JNI_GetCreatedJavaVMs","int",["pointer","int","pointer"]],artInterpreterToCompiledCodeBridge:function(u){this.artInterpreterToCompiledCodeBridge=u},_ZN3art9JavaVMExt12AddGlobalRefEPNS_6ThreadENS_6ObjPtrINS_6mirror6ObjectEEE:["art::JavaVMExt::AddGlobalRef","pointer",["pointer","pointer","pointer"]],_ZN3art9JavaVMExt12AddGlobalRefEPNS_6ThreadEPNS_6mirror6ObjectE:["art::JavaVMExt::AddGlobalRef","pointer",["pointer","pointer","pointer"]],_ZN3art17ReaderWriterMutex13ExclusiveLockEPNS_6ThreadE:["art::ReaderWriterMutex::ExclusiveLock","void",["pointer","pointer"]],_ZN3art17ReaderWriterMutex15ExclusiveUnlockEPNS_6ThreadE:["art::ReaderWriterMutex::ExclusiveUnlock","void",["pointer","pointer"]],_ZN3art22IndirectReferenceTable3AddEjPNS_6mirror6ObjectE:function(u){this["art::IndirectReferenceTable::Add"]=new NativeFunction(u,"pointer",["pointer","uint","pointer"],X)},_ZN3art22IndirectReferenceTable3AddENS_15IRTSegmentStateENS_6ObjPtrINS_6mirror6ObjectEEE:function(u){this["art::IndirectReferenceTable::Add"]=new NativeFunction(u,"pointer",["pointer","uint","pointer"],X)},_ZN3art9JavaVMExt12DecodeGlobalEPv:function(u){let m;le()>=26?m=Oc(u,["pointer","pointer"]):m=new NativeFunction(u,"pointer",["pointer","pointer"],X),this["art::JavaVMExt::DecodeGlobal"]=function(p,g,y){return m(p,y)}},_ZN3art9JavaVMExt12DecodeGlobalEPNS_6ThreadEPv:["art::JavaVMExt::DecodeGlobal","pointer",["pointer","pointer","pointer"]],_ZNK3art6Thread19DecodeGlobalJObjectEP8_jobject:["art::Thread::DecodeJObject","pointer",["pointer","pointer"]],_ZNK3art6Thread13DecodeJObjectEP8_jobject:["art::Thread::DecodeJObject","pointer",["pointer","pointer"]],_ZN3art10ThreadList10SuspendAllEPKcb:["art::ThreadList::SuspendAll","void",["pointer","pointer","bool"]],_ZN3art10ThreadList10SuspendAllEv:function(u){let m=new NativeFunction(u,"void",["pointer"],X);this["art::ThreadList::SuspendAll"]=function(p,g,y){return m(p)}},_ZN3art10ThreadList9ResumeAllEv:["art::ThreadList::ResumeAll","void",["pointer"]],_ZN3art11ClassLinker12VisitClassesEPNS_12ClassVisitorE:["art::ClassLinker::VisitClasses","void",["pointer","pointer"]],_ZN3art11ClassLinker12VisitClassesEPFbPNS_6mirror5ClassEPvES4_:function(u){let m=new NativeFunction(u,"void",["pointer","pointer","pointer"],X);this["art::ClassLinker::VisitClasses"]=function(p,g){m(p,g,NULL)}},_ZNK3art11ClassLinker17VisitClassLoadersEPNS_18ClassLoaderVisitorE:["art::ClassLinker::VisitClassLoaders","void",["pointer","pointer"]],_ZN3art2gc4Heap12VisitObjectsEPFvPNS_6mirror6ObjectEPvES5_:["art::gc::Heap::VisitObjects","void",["pointer","pointer","pointer"]],_ZN3art2gc4Heap12GetInstancesERNS_24VariableSizedHandleScopeENS_6HandleINS_6mirror5ClassEEEiRNSt3__16vectorINS4_INS5_6ObjectEEENS8_9allocatorISB_EEEE:["art::gc::Heap::GetInstances","void",["pointer","pointer","pointer","int","pointer"]],_ZN3art2gc4Heap12GetInstancesERNS_24VariableSizedHandleScopeENS_6HandleINS_6mirror5ClassEEEbiRNSt3__16vectorINS4_INS5_6ObjectEEENS8_9allocatorISB_EEEE:function(u){let m=new NativeFunction(u,"void",["pointer","pointer","pointer","bool","int","pointer"],X);this["art::gc::Heap::GetInstances"]=function(p,g,y,E,O){m(p,g,y,0,E,O)}},_ZN3art12StackVisitorC2EPNS_6ThreadEPNS_7ContextENS0_13StackWalkKindEjb:["art::StackVisitor::StackVisitor","void",["pointer","pointer","pointer","uint","uint","bool"]],_ZN3art12StackVisitorC2EPNS_6ThreadEPNS_7ContextENS0_13StackWalkKindEmb:["art::StackVisitor::StackVisitor","void",["pointer","pointer","pointer","uint","size_t","bool"]],_ZN3art12StackVisitor9WalkStackILNS0_16CountTransitionsE0EEEvb:["art::StackVisitor::WalkStack","void",["pointer","bool"]],_ZNK3art12StackVisitor9GetMethodEv:["art::StackVisitor::GetMethod","pointer",["pointer"]],_ZNK3art12StackVisitor16DescribeLocationEv:function(u){this["art::StackVisitor::DescribeLocation"]=zt(u,["pointer"])},_ZNK3art12StackVisitor24GetCurrentQuickFrameInfoEv:function(u){this["art::StackVisitor::GetCurrentQuickFrameInfo"]=hl(u)},_ZN3art7Context6CreateEv:["art::Context::Create","pointer",[]],_ZN3art6Thread18GetLongJumpContextEv:["art::Thread::GetLongJumpContext","pointer",["pointer"]],_ZN3art6mirror5Class13GetDescriptorEPNSt3__112basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEE:function(u){this["art::mirror::Class::GetDescriptor"]=u},_ZN3art6mirror5Class11GetLocationEv:function(u){this["art::mirror::Class::GetLocation"]=zt(u,["pointer"])},_ZN3art9ArtMethod12PrettyMethodEb:function(u){this["art::ArtMethod::PrettyMethod"]=zt(u,["pointer","bool"])},_ZN3art12PrettyMethodEPNS_9ArtMethodEb:function(u){this["art::ArtMethod::PrettyMethodNullSafe"]=zt(u,["pointer","bool"])},_ZN3art6Thread14CurrentFromGdbEv:["art::Thread::CurrentFromGdb","pointer",[]],_ZN3art6mirror6Object5CloneEPNS_6ThreadE:function(u){this["art::mirror::Object::Clone"]=new NativeFunction(u,"pointer",["pointer","pointer"],X)},_ZN3art6mirror6Object5CloneEPNS_6ThreadEm:function(u){let m=new NativeFunction(u,"pointer",["pointer","pointer","pointer"],X);this["art::mirror::Object::Clone"]=function(p,g){let y=NULL;return m(p,g,y)}},_ZN3art6mirror6Object5CloneEPNS_6ThreadEj:function(u){let m=new NativeFunction(u,"pointer",["pointer","pointer","uint"],X);this["art::mirror::Object::Clone"]=function(p,g){return m(p,g,0)}},_ZN3art3Dbg14SetJdwpAllowedEb:["art::Dbg::SetJdwpAllowed","void",["bool"]],_ZN3art3Dbg13ConfigureJdwpERKNS_4JDWP11JdwpOptionsE:["art::Dbg::ConfigureJdwp","void",["pointer"]],_ZN3art31InternalDebuggerControlCallback13StartDebuggerEv:["art::InternalDebuggerControlCallback::StartDebugger","void",["pointer"]],_ZN3art3Dbg9StartJdwpEv:["art::Dbg::StartJdwp","void",[]],_ZN3art3Dbg8GoActiveEv:["art::Dbg::GoActive","void",[]],_ZN3art3Dbg21RequestDeoptimizationERKNS_21DeoptimizationRequestE:["art::Dbg::RequestDeoptimization","void",["pointer"]],_ZN3art3Dbg20ManageDeoptimizationEv:["art::Dbg::ManageDeoptimization","void",[]],_ZN3art15instrumentation15Instrumentation20EnableDeoptimizationEv:["art::Instrumentation::EnableDeoptimization","void",["pointer"]],_ZN3art15instrumentation15Instrumentation20DeoptimizeEverythingEPKc:["art::Instrumentation::DeoptimizeEverything","void",["pointer","pointer"]],_ZN3art15instrumentation15Instrumentation20DeoptimizeEverythingEv:function(u){let m=new NativeFunction(u,"void",["pointer"],X);this["art::Instrumentation::DeoptimizeEverything"]=function(p,g){m(p)}},_ZN3art7Runtime19DeoptimizeBootImageEv:["art::Runtime::DeoptimizeBootImage","void",["pointer"]],_ZN3art15instrumentation15Instrumentation10DeoptimizeEPNS_9ArtMethodE:["art::Instrumentation::Deoptimize","void",["pointer","pointer"]],_ZN3art3jni12JniIdManager14DecodeMethodIdEP10_jmethodID:["art::jni::JniIdManager::DecodeMethodId","pointer",["pointer","pointer"]],_ZN3art3jni12JniIdManager13DecodeFieldIdEP9_jfieldID:["art::jni::JniIdManager::DecodeFieldId","pointer",["pointer","pointer"]],_ZN3art11interpreter18GetNterpEntryPointEv:["art::interpreter::GetNterpEntryPoint","pointer",[]],_ZN3art7Monitor17TranslateLocationEPNS_9ArtMethodEjPPKcPi:["art::Monitor::TranslateLocation","void",["pointer","uint32","pointer","pointer"]]},variables:{_ZN3art3Dbg9gRegistryE:function(u){this.isJdwpStarted=()=>!u.readPointer().isNull()},_ZN3art3Dbg15gDebuggerActiveE:function(u){this.isDebuggerActive=()=>!!u.readU8()}},optionals:new Set(["artInterpreterToCompiledCodeBridge","_ZN3art9JavaVMExt12AddGlobalRefEPNS_6ThreadENS_6ObjPtrINS_6mirror6ObjectEEE","_ZN3art9JavaVMExt12AddGlobalRefEPNS_6ThreadEPNS_6mirror6ObjectE","_ZN3art9JavaVMExt12DecodeGlobalEPv","_ZN3art9JavaVMExt12DecodeGlobalEPNS_6ThreadEPv","_ZNK3art6Thread19DecodeGlobalJObjectEP8_jobject","_ZNK3art6Thread13DecodeJObjectEP8_jobject","_ZN3art10ThreadList10SuspendAllEPKcb","_ZN3art10ThreadList10SuspendAllEv","_ZN3art11ClassLinker12VisitClassesEPNS_12ClassVisitorE","_ZN3art11ClassLinker12VisitClassesEPFbPNS_6mirror5ClassEPvES4_","_ZNK3art11ClassLinker17VisitClassLoadersEPNS_18ClassLoaderVisitorE","_ZN3art6mirror6Object5CloneEPNS_6ThreadE","_ZN3art6mirror6Object5CloneEPNS_6ThreadEm","_ZN3art6mirror6Object5CloneEPNS_6ThreadEj","_ZN3art22IndirectReferenceTable3AddEjPNS_6mirror6ObjectE","_ZN3art22IndirectReferenceTable3AddENS_15IRTSegmentStateENS_6ObjPtrINS_6mirror6ObjectEEE","_ZN3art2gc4Heap12VisitObjectsEPFvPNS_6mirror6ObjectEPvES5_","_ZN3art2gc4Heap12GetInstancesERNS_24VariableSizedHandleScopeENS_6HandleINS_6mirror5ClassEEEiRNSt3__16vectorINS4_INS5_6ObjectEEENS8_9allocatorISB_EEEE","_ZN3art2gc4Heap12GetInstancesERNS_24VariableSizedHandleScopeENS_6HandleINS_6mirror5ClassEEEbiRNSt3__16vectorINS4_INS5_6ObjectEEENS8_9allocatorISB_EEEE","_ZN3art12StackVisitorC2EPNS_6ThreadEPNS_7ContextENS0_13StackWalkKindEjb","_ZN3art12StackVisitorC2EPNS_6ThreadEPNS_7ContextENS0_13StackWalkKindEmb","_ZN3art12StackVisitor9WalkStackILNS0_16CountTransitionsE0EEEvb","_ZNK3art12StackVisitor9GetMethodEv","_ZNK3art12StackVisitor16DescribeLocationEv","_ZNK3art12StackVisitor24GetCurrentQuickFrameInfoEv","_ZN3art7Context6CreateEv","_ZN3art6Thread18GetLongJumpContextEv","_ZN3art6mirror5Class13GetDescriptorEPNSt3__112basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEE","_ZN3art6mirror5Class11GetLocationEv","_ZN3art9ArtMethod12PrettyMethodEb","_ZN3art12PrettyMethodEPNS_9ArtMethodEb","_ZN3art3Dbg13ConfigureJdwpERKNS_4JDWP11JdwpOptionsE","_ZN3art31InternalDebuggerControlCallback13StartDebuggerEv","_ZN3art3Dbg15gDebuggerActiveE","_ZN3art15instrumentation15Instrumentation20EnableDeoptimizationEv","_ZN3art15instrumentation15Instrumentation20DeoptimizeEverythingEPKc","_ZN3art15instrumentation15Instrumentation20DeoptimizeEverythingEv","_ZN3art7Runtime19DeoptimizeBootImageEv","_ZN3art15instrumentation15Instrumentation10DeoptimizeEPNS_9ArtMethodE","_ZN3art3Dbg9StartJdwpEv","_ZN3art3Dbg8GoActiveEv","_ZN3art3Dbg21RequestDeoptimizationERKNS_21DeoptimizationRequestE","_ZN3art3Dbg20ManageDeoptimizationEv","_ZN3art3Dbg9gRegistryE","_ZN3art3jni12JniIdManager14DecodeMethodIdEP10_jmethodID","_ZN3art3jni12JniIdManager13DecodeFieldIdEP9_jfieldID","_ZN3art11interpreter18GetNterpEntryPointEv","_ZN3art7Monitor17TranslateLocationEPNS_9ArtMethodEjPPKcPi"])}:{functions:{_Z20dvmDecodeIndirectRefP6ThreadP8_jobject:["dvmDecodeIndirectRef","pointer",["pointer","pointer"]],_Z15dvmUseJNIBridgeP6MethodPv:["dvmUseJNIBridge","void",["pointer","pointer"]],_Z20dvmHeapSourceGetBasev:["dvmHeapSourceGetBase","pointer",[]],_Z21dvmHeapSourceGetLimitv:["dvmHeapSourceGetLimit","pointer",[]],_Z16dvmIsValidObjectPK6Object:["dvmIsValidObject","uint8",["pointer"]],JNI_GetCreatedJavaVMs:["JNI_GetCreatedJavaVMs","int",["pointer","int","pointer"]]},variables:{gDvmJni:function(u){this.gDvmJni=u},gDvm:function(u){this.gDvm=u}}},{functions:i={},variables:a={},optionals:c=new Set}=o,l=[];for(let[u,m]of Object.entries(i)){let p=s.find(u);p!==null?typeof m=="function"?m.call(s,p):s[m[0]]=new NativeFunction(p,m[1],m[2],X):c.has(u)||l.push(u)}for(let[u,m]of Object.entries(a)){let p=s.find(u);p!==null?m.call(s,p):c.has(u)||l.push(u)}if(l.length>0)throw new Error("Java API only partially available; please file a bug. Missing: "+l.join(", "));let d=Memory.alloc(x),f=Memory.alloc(Va);if(be("JNI_GetCreatedJavaVMs",s.JNI_GetCreatedJavaVMs(d,1,f)),f.readInt()===0)return null;if(s.vm=d.readPointer(),r){let u=le(),m;u>=27?m=33554432:u>=24?m=16777216:m=0,s.kAccCompileDontBother=m;let p=s.vm.add(x).readPointer();s.artRuntime=p;let g=Ls(s),y=g.offset,E=y.instrumentation;s.artInstrumentation=E!==null?p.add(E):null,or()>=36e7&&s.artInstrumentation!=null&&(s.artInstrumentation=s.artInstrumentation.readPointer()),s.artHeap=p.add(y.heap).readPointer(),s.artThreadList=p.add(y.threadList).readPointer();let k=p.add(y.classLinker).readPointer(),C=Qc(p,g).offset,P=k.add(C.quickResolutionTrampoline).readPointer(),I=k.add(C.quickImtConflictTrampoline).readPointer(),R=k.add(C.quickGenericJniTrampoline).readPointer(),N=k.add(C.quickToInterpreterBridgeTrampoline).readPointer();s.artClassLinker={address:k,quickResolutionTrampoline:P,quickImtConflictTrampoline:I,quickGenericJniTrampoline:R,quickToInterpreterBridgeTrampoline:N};let T=new Pe(s);s.artQuickGenericJniTrampoline=Vn(R,T),s.artQuickToInterpreterBridge=Vn(N,T),s.artQuickResolutionTrampoline=Vn(P,T),s["art::JavaVMExt::AddGlobalRef"]===void 0&&(s["art::JavaVMExt::AddGlobalRef"]=Zl(s)),s["art::JavaVMExt::DecodeGlobal"]===void 0&&(s["art::JavaVMExt::DecodeGlobal"]=ql(s)),s["art::ArtMethod::PrettyMethod"]===void 0&&(s["art::ArtMethod::PrettyMethod"]=s["art::ArtMethod::PrettyMethodNullSafe"]),s["art::interpreter::GetNterpEntryPoint"]!==void 0?s.artNterpEntryPoint=s["art::interpreter::GetNterpEntryPoint"]():s.artNterpEntryPoint=s.find("ExecuteNterpImpl"),fe=gl(s,T),Ql(s);let F=null;Object.defineProperty(s,"jvmti",{get(){return F===null&&(F=[Ic(T,this.artRuntime)]),F[0]}})}let h=e.enumerateImports().filter(u=>u.name.indexOf("_Z")===0).reduce((u,m)=>(u[m.name]=m.address,u),{});return s.$new=new NativeFunction(h._Znwm||h._Znwj,"pointer",["ulong"],X),s.$delete=new NativeFunction(h._ZdlPv,"void",["pointer"],X),ks=r?er:tr,s}function Ic(t,e){let n=null;return t.perform(()=>{let r=Z().find("_ZN3art7Runtime18EnsurePluginLoadedEPKcPNSt3__112basic_stringIcNS3_11char_traitsIcEENS3_9allocatorIcEEEE");if(r===null)return;let s=new NativeFunction(r,"bool",["pointer","pointer","pointer"]),o=Memory.alloc(x);if(!s(e,Memory.allocUtf8String("libopenjdkjvmti.so"),o))return;let a=Rt.v1_2|1073741824,c=t.tryGetEnvHandle(a);if(c===null)return;n=new Ue(c,t);let l=Memory.alloc(8);l.writeU64(Pt.canTagObjects),n.addCapabilities(l)!==0&&(n=null)}),n}function Fc(t,e){Z().flavor==="art"&&t.getClassName(e)}function Cc(t){return{offset:x===4?{globalsLock:32,globals:72}:{globalsLock:64,globals:112}}}function Uc(t){let e=t.vm,n=t.artRuntime,r=x===4?200:384,s=r+100*x,o=le(),i=Ms(),{isApiLevel34OrApexEquivalent:a}=t,c=null;for(let d=r;d!==s;d+=x)if(n.add(d).readPointer().equals(e)){let h,u=null;o>=33||i==="Tiramisu"||a?(h=[d-4*x],u=d-x):o>=30||i==="R"?(h=[d-3*x,d-4*x],u=d-x):o>=29?h=[d-2*x]:o>=27?h=[d-St-3*x]:h=[d-St-2*x];for(let m of h){let p=m-x,g=p-x,y;a?y=g-9*x:o>=24?y=g-8*x:o>=23?y=g-7*x:y=g-4*x;let E={offset:{heap:y,threadList:g,internTable:p,classLinker:m,jniIdManager:u}};if(Os(n,E)!==null){c=E;break}}break}if(c===null)throw new Error("Unable to determine Runtime field offsets");let l=or()>=36e7;return c.offset.instrumentation=l?$c(t):zc(t),c.offset.jniIdsIndirection=qc(t),c}var Dc={ia32:_s,x64:_s,arm:Gc,arm64:Vc};function zc(t){let e=t["art::Runtime::DeoptimizeBootImage"];return e===void 0?null:De(e,Dc[Process.arch],{limit:30})}function _s(t){if(t.mnemonic!=="lea")return null;let e=t.operands[1].value.disp;return e<256||e>1024?null:e}function Gc(t){if(t.mnemonic!=="add.w")return null;let e=t.operands;if(e.length!==3)return null;let n=e[2];return n.type!=="imm"?null:n.value}function Vc(t){if(t.mnemonic!=="add")return null;let e=t.operands;if(e.length!==3||e[0].value==="sp"||e[1].value==="sp")return null;let n=e[2];if(n.type!=="imm")return null;let r=n.value.valueOf();return r<256||r>1024?null:r}var Bc={ia32:gs,x64:gs,arm:Jc,arm64:Hc};function $c(t){let e=t["art::Runtime::DeoptimizeBootImage"];return e===void 0?null:De(e,Bc[Process.arch],{limit:30})}function gs(t){if(t.mnemonic!=="mov")return null;let e=t.operands;if(e[0].value!=="rax")return null;let r=e[1];if(r.type!=="mem")return null;let s=r.value;if(s.base!=="rdi")return null;let o=s.disp;return o<256||o>1024?null:o}function Jc(t){return null}function Hc(t){if(t.mnemonic!=="ldr")return null;let e=t.operands;if(e[0].value==="x0")return null;let n=e[1].value;if(n.base!=="x0")return null;let r=n.disp;return r<256||r>1024?null:r}var Zc={ia32:ys,x64:ys,arm:Wc,arm64:Kc};function qc(t){let e=t.find("_ZN3art7Runtime12SetJniIdTypeENS_9JniIdTypeE");if(e===null)return null;let n=De(e,Zc[Process.arch],{limit:20});if(n===null)throw new Error("Unable to determine Runtime.jni_ids_indirection_ offset");return n}function ys(t){return t.mnemonic==="cmp"?t.operands[0].value.disp:null}function Wc(t){return t.mnemonic==="ldr.w"?t.operands[1].value.disp:null}function Kc(t,e){if(e===null)return null;let{mnemonic:n}=t,{mnemonic:r}=e;return n==="cmp"&&r==="ldr"||n==="bl"&&r==="str"?e.operands[1].value.disp:null}function Yc(){let e={"4-21":136,"4-22":136,"4-23":172,"4-24":196,"4-25":196,"4-26":196,"4-27":196,"4-28":212,"4-29":172,"4-30":180,"4-31":180,"8-21":224,"8-22":224,"8-23":296,"8-24":344,"8-25":344,"8-26":352,"8-27":352,"8-28":392,"8-29":328,"8-30":336,"8-31":336}[`${x}-${le()}`];if(e===void 0)throw new Error("Unable to determine Instrumentation field offsets");return{offset:{forcedInterpretOnly:4,deoptimizationEnabled:e}}}function Qc(t,e){let n=Os(t,e);if(n===null)throw new Error("Unable to determine ClassLinker field offsets");return n}function Os(t,e){if(Dn!==null)return Dn;let{classLinker:n,internTable:r}=e.offset,s=t.add(n).readPointer(),o=t.add(r).readPointer(),i=x===4?100:200,a=i+100*x,c=le(),l=null;for(let d=i;d!==a;d+=x)if(s.add(d).readPointer().equals(o)){let h;c>=30||Ms()==="R"?h=6:c>=29?h=4:c>=23?h=3:h=5;let u=d+h*x,m;c>=23?m=u-2*x:m=u-3*x,l={offset:{quickResolutionTrampoline:m,quickImtConflictTrampoline:u-x,quickGenericJniTrampoline:u,quickToInterpreterBridgeTrampoline:u+x}};break}return l!==null&&(Dn=l),l}function ar(t){let n=null;return t.perform(r=>{let s=Wt(t),o=xe(t),i={artArrayLengthSize:4,artArrayEntrySize:s.size,artArrayMax:50},a={artArrayLengthSize:x,artArrayEntrySize:o.size,artArrayMax:100},c=(h,u,m)=>{let p=h.add(u).readPointer();if(p.isNull())return null;let g=m===4?p.readU32():p.readU64().valueOf();return g<=0?null:{length:g,data:p.add(m)}},l=(h,u,m,p)=>{try{let g=c(h,u,p.artArrayLengthSize);if(g===null)return!1;let y=Math.min(g.length,p.artArrayMax);for(let E=0;E!==y;E++)if(g.data.add(E*p.artArrayEntrySize).equals(m))return!0}catch{}return!1},d=r.findClass("java/lang/Thread"),f=r.newGlobalRef(d);try{let h;Me(t,r,R=>{h=Z()["art::JavaVMExt::DecodeGlobal"](t,R,f)});let u=Ss(r.getFieldId(f,"name","Ljava/lang/String;")),m=Ss(r.getStaticFieldId(f,"MAX_PRIORITY","I")),p=-1,g=-1;for(let R=0;R!==256;R+=4)p===-1&&l(h,R,m,i)&&(p=R),g===-1&&l(h,R,u,i)&&(g=R);if(g===-1||p===-1)throw new Error("Unable to find fields in java/lang/Thread; please file a bug");let y=g!==p?p:0,E=g,O=-1,k=pr(r.getMethodId(f,"getName","()Ljava/lang/String;"));for(let R=0;R!==256;R+=4)O===-1&&l(h,R,k,a)&&(O=R);if(O===-1)throw new Error("Unable to find methods in java/lang/Thread; please file a bug");let C=-1,I=c(h,O,a.artArrayLengthSize).length;for(let R=O;R!==256;R+=4)if(h.add(R).readU16()===I){C=R;break}if(C===-1)throw new Error("Unable to find copied methods in java/lang/Thread; please file a bug");n={offset:{ifields:E,methods:O,sfields:y,copiedMethodsOffset:C}}}finally{r.deleteLocalRef(d),r.deleteGlobalRef(f)}}),n}function Xc(t){let e=Z(),n;return t.perform(r=>{let s=r.findClass("android/os/Process"),o=pr(r.getStaticMethodId(s,"getElapsedCpuTime","()J"));r.deleteLocalRef(s);let i=Process.getModuleByName("libandroid_runtime.so"),a=i.base,c=a.add(i.size),l=le(),d=l<=21?8:x,f=Za|qa|Wa|Gt,h=~(As|tc|ec|Hn)>>>0,u=null,m=null,p=2;for(let E=0;E!==64&&p!==0;E+=4){let O=o.add(E);if(u===null){let k=O.readPointer();k.compare(a)>=0&&k.compare(c)<0&&(u=E,p--)}m===null&&(O.readU32()&h)===f&&(m=E,p--)}if(p!==0)throw new Error("Unable to determine ArtMethod field offsets");let g=u+d;n={size:l<=21?g+32:g+x,offset:{jniCode:u,quickCode:g,accessFlags:m}},"artInterpreterToCompiledCodeBridge"in e&&(n.offset.interpreterCode=u-d)}),n}function Wt(t){let e=le();return e>=23?{size:16,offset:{accessFlags:4}}:e>=21?{size:24,offset:{accessFlags:12}}:null}function el(t){let e=le(),n;return t.perform(r=>{let s=Kt(r),o=r.handle,i=null,a=null,c=null,l=null,d=null,f=null;for(let h=144;h!==256;h+=x)if(s.add(h).readPointer().equals(o)){a=h-6*x,d=h-4*x,f=h+2*x,e<=22&&(a-=x,i=a-x-9*8-3*4,c=h+6*x,d-=x,f-=x),l=h+9*x,e<=22&&(l+=2*x+4,x===8&&(l+=4)),e>=23&&(l+=x);break}if(l===null)throw new Error("Unable to determine ArtThread field offsets");n={offset:{isExceptionReportedToInstrumentation:i,exception:a,throwLocation:c,topHandleScope:l,managedStack:d,self:f}}}),n}function tl(){return le()>=23?{offset:{topQuickFrame:0,link:x}}:{offset:{topQuickFrame:2*x,link:0}}}var nl={ia32:bs,x64:bs,arm:rl,arm64:sl};function Vn(t,e){let n;return e.perform(r=>{let s=Kt(r),o=nl[Process.arch],i=Instruction.parse(t),a=o(i);a!==null?n=s.add(a).readPointer():n=t}),n}function bs(t){return t.mnemonic==="jmp"?t.operands[0].value.disp:null}function rl(t){return t.mnemonic==="ldr.w"?t.operands[1].value.disp:null}function sl(t){return t.mnemonic==="ldr"?t.operands[1].value.disp:null}function Kt(t){return t.handle.add(x).readPointer()}function ol(){return cr("ro.build.version.release")}function il(){return cr("ro.build.version.codename")}function al(){return parseInt(cr("ro.build.version.sdk"),10)}function cl(){try{let t=File.readAllText("/proc/self/mountinfo"),e=null,n=new Map;for(let s of t.trimEnd().split(`
`)){let o=s.split(" "),i=o[4];if(!i.startsWith("/apex/com.android.art"))continue;let a=o[10];i.includes("@")?n.set(a,i.split("@")[1]):e=a}let r=n.get(e);return r!==void 0?parseInt(r):Es()}catch{return Es()}}function Es(){return le()*1e7}var Bn=null,ll=92;function cr(t){Bn===null&&(Bn=new NativeFunction(Process.getModuleByName("libc.so").getExportByName("__system_property_get"),"int",["pointer","pointer"],X));let e=Memory.alloc(ll);return Bn(Memory.allocUtf8String(t),e),e.readUtf8String()}function Me(t,e,n){let r=kc(t,e),s=Kt(e).toString();if(yt[s]=n,r(e.handle),yt[s]!==void 0)throw delete yt[s],new Error("Unable to perform state transition; please file a bug")}function dl(t,e){let n=new NativeCallback(ul,"void",["pointer"]);return Is(t,e,n)}function ul(t){let e=t.toString(),n=yt[e];delete yt[e],n(t)}function lr(t){let e=Z(),n=e.artThreadList;e["art::ThreadList::SuspendAll"](n,Memory.allocUtf8String("frida"),!1?1:0);try{t()}finally{e["art::ThreadList::ResumeAll"](n)}}var Wn=class{constructor(e){let n=Memory.alloc(4*x),r=n.add(x);n.writePointer(r);let s=new NativeCallback((o,i)=>e(i)===!0?1:0,"bool",["pointer","pointer"]);r.add(2*x).writePointer(s),this.handle=n,this._onVisit=s}};function dr(t){return Z()["art::ClassLinker::VisitClasses"]instanceof NativeFunction?new Wn(t):new NativeCallback(n=>t(n)===!0?1:0,"bool",["pointer","pointer"])}var Kn=class{constructor(e){let n=Memory.alloc(4*x),r=n.add(x);n.writePointer(r);let s=new NativeCallback((o,i)=>{e(i)},"void",["pointer","pointer"]);r.add(2*x).writePointer(s),this.handle=n,this._onVisit=s}};function ur(t){return new Kn(t)}var fl={"include-inlined-frames":0,"skip-inlined-frames":1},Yn=class{constructor(e,n,r,s=0,o=!0){let i=Z(),a=512,c=3*x,l=Memory.alloc(a+c);i["art::StackVisitor::StackVisitor"](l,e,n,fl[r],s,o?1:0);let d=l.add(a);l.writePointer(d);let f=new NativeCallback(this._visitFrame.bind(this),"bool",["pointer"]);d.add(2*x).writePointer(f),this.handle=l,this._onVisitFrame=f;let h=l.add(x===4?12:24);this._curShadowFrame=h,this._curQuickFrame=h.add(x),this._curQuickFramePc=h.add(2*x),this._curOatQuickMethodHeader=h.add(3*x),this._getMethodImpl=i["art::StackVisitor::GetMethod"],this._descLocImpl=i["art::StackVisitor::DescribeLocation"],this._getCQFIImpl=i["art::StackVisitor::GetCurrentQuickFrameInfo"]}walkStack(e=!1){Z()["art::StackVisitor::WalkStack"](this.handle,e?1:0)}_visitFrame(){return this.visitFrame()?1:0}visitFrame(){throw new Error("Subclass must implement visitFrame")}getMethod(){let e=this._getMethodImpl(this.handle);return e.isNull()?null:new Bt(e)}getCurrentQuickFramePc(){return this._curQuickFramePc.readPointer()}getCurrentQuickFrame(){return this._curQuickFrame.readPointer()}getCurrentShadowFrame(){return this._curShadowFrame.readPointer()}describeLocation(){let e=new Ht;return this._descLocImpl(e,this.handle),e.disposeToString()}getCurrentOatQuickMethodHeader(){return this._curOatQuickMethodHeader.readPointer()}getCurrentQuickFrameInfo(){return this._getCQFIImpl(this.handle)}},Bt=class{constructor(e){this.handle=e}prettyMethod(e=!0){let n=new Ht;return Z()["art::ArtMethod::PrettyMethod"](n,this.handle,e?1:0),n.disposeToString()}toString(){return`ArtMethod(handle=${this.handle})`}};function hl(t){return function(e){let n=Memory.alloc(12);return jc(t)(n,e),{frameSizeInBytes:n.readU32(),coreSpillMask:n.add(4).readU32(),fpSpillMask:n.add(8).readU32()}}}function pl(t){let e=NULL;switch(Process.arch){case"ia32":e=nt(32,n=>{n.putMovRegRegOffsetPtr("ecx","esp",4),n.putMovRegRegOffsetPtr("edx","esp",8),n.putCallAddressWithArguments(t,["ecx","edx"]),n.putMovRegReg("esp","ebp"),n.putPopReg("ebp"),n.putRet()});break;case"x64":e=nt(32,n=>{n.putPushReg("rdi"),n.putCallAddressWithArguments(t,["rsi"]),n.putPopReg("rdi"),n.putMovRegPtrReg("rdi","rax"),n.putMovRegOffsetPtrReg("rdi",8,"edx"),n.putRet()});break;case"arm":e=nt(16,n=>{n.putCallAddressWithArguments(t,["r0","r1"]),n.putPopRegs(["r0","lr"]),n.putMovRegReg("pc","lr")});break;case"arm64":e=nt(64,n=>{n.putPushRegReg("x0","lr"),n.putCallAddressWithArguments(t,["x1"]),n.putPopRegReg("x2","lr"),n.putStrRegRegOffset("x0","x2",0),n.putStrRegRegOffset("w1","x2",8),n.putRet()});break}return new NativeFunction(e,"void",["pointer","pointer"],X)}var ml={ia32:globalThis.X86Relocator,x64:globalThis.X86Relocator,arm:globalThis.ThumbRelocator,arm64:globalThis.Arm64Relocator},Qn={ia32:globalThis.X86Writer,x64:globalThis.X86Writer,arm:globalThis.ThumbWriter,arm64:globalThis.Arm64Writer};function nt(t,e){zn===null&&(zn=Memory.alloc(Process.pageSize));let n=zn.add(hs),r=Process.arch,s=Qn[r];return Memory.patchCode(n,t,o=>{let i=new s(o,{pc:n});if(e(i),i.flush(),i.offset>t)throw new Error(`Wrote ${i.offset}, exceeding maximum of ${t}`)}),hs+=t,r==="arm"?n.or(1):n}function _l(t,e){yl(e),wl(e)}function gl(t,e){let n=rt(e).offset,r=Mc().offset,s=`
#include <gum/guminterceptor.h>

extern GMutex lock;
extern GHashTable * methods;
extern GHashTable * replacements;
extern gpointer last_seen_art_method;

extern gpointer get_oat_quick_method_header_impl (gpointer method, gpointer pc);

void
init (void)
{
  g_mutex_init (&lock);
  methods = g_hash_table_new_full (NULL, NULL, NULL, NULL);
  replacements = g_hash_table_new_full (NULL, NULL, NULL, NULL);
}

void
finalize (void)
{
  g_hash_table_unref (replacements);
  g_hash_table_unref (methods);
  g_mutex_clear (&lock);
}

gboolean
is_replacement_method (gpointer method)
{
  gboolean is_replacement;

  g_mutex_lock (&lock);

  is_replacement = g_hash_table_contains (replacements, method);

  g_mutex_unlock (&lock);

  return is_replacement;
}

gpointer
get_replacement_method (gpointer original_method)
{
  gpointer replacement_method;

  g_mutex_lock (&lock);

  replacement_method = g_hash_table_lookup (methods, original_method);

  g_mutex_unlock (&lock);

  return replacement_method;
}

void
set_replacement_method (gpointer original_method,
                        gpointer replacement_method)
{
  g_mutex_lock (&lock);

  g_hash_table_insert (methods, original_method, replacement_method);
  g_hash_table_insert (replacements, replacement_method, original_method);

  g_mutex_unlock (&lock);
}

void
synchronize_replacement_methods (guint quick_code_offset,
                                 void * nterp_entrypoint,
                                 void * quick_to_interpreter_bridge)
{
  GHashTableIter iter;
  gpointer hooked_method, replacement_method;

  g_mutex_lock (&lock);

  g_hash_table_iter_init (&iter, methods);
  while (g_hash_table_iter_next (&iter, &hooked_method, &replacement_method))
  {
    void ** quick_code;

    *((uint32_t *) replacement_method) = *((uint32_t *) hooked_method);

    quick_code = hooked_method + quick_code_offset;
    if (*quick_code == nterp_entrypoint)
      *quick_code = quick_to_interpreter_bridge;
  }

  g_mutex_unlock (&lock);
}

void
delete_replacement_method (gpointer original_method)
{
  gpointer replacement_method;

  g_mutex_lock (&lock);

  replacement_method = g_hash_table_lookup (methods, original_method);
  if (replacement_method != NULL)
  {
    g_hash_table_remove (methods, original_method);
    g_hash_table_remove (replacements, replacement_method);
  }

  g_mutex_unlock (&lock);
}

gpointer
translate_method (gpointer method)
{
  gpointer translated_method;

  g_mutex_lock (&lock);

  translated_method = g_hash_table_lookup (replacements, method);

  g_mutex_unlock (&lock);

  return (translated_method != NULL) ? translated_method : method;
}

gpointer
find_replacement_method_from_quick_code (gpointer method,
                                         gpointer thread)
{
  gpointer replacement_method;
  gpointer managed_stack;
  gpointer top_quick_frame;
  gpointer link_managed_stack;
  gpointer * link_top_quick_frame;

  replacement_method = get_replacement_method (method);
  if (replacement_method == NULL)
    return NULL;

  /*
   * Stack check.
   *
   * Return NULL to indicate that the original method should be invoked, otherwise
   * return a pointer to the replacement ArtMethod.
   *
   * If the caller is our own JNI replacement stub, then a stack transition must
   * have been pushed onto the current thread's linked list.
   *
   * Therefore, we invoke the original method if the following conditions are met:
   *   1- The current managed stack is empty.
   *   2- The ArtMethod * inside the linked managed stack's top quick frame is the
   *      same as our replacement.
   */
  managed_stack = thread + ${n.managedStack};
  top_quick_frame = *((gpointer *) (managed_stack + ${r.topQuickFrame}));
  if (top_quick_frame != NULL)
    return replacement_method;

  link_managed_stack = *((gpointer *) (managed_stack + ${r.link}));
  if (link_managed_stack == NULL)
    return replacement_method;

  link_top_quick_frame = GSIZE_TO_POINTER (*((gsize *) (link_managed_stack + ${r.topQuickFrame})) & ~((gsize) 1));
  if (link_top_quick_frame == NULL || *link_top_quick_frame != replacement_method)
    return replacement_method;

  return NULL;
}

void
on_interpreter_do_call (GumInvocationContext * ic)
{
  gpointer method, replacement_method;

  method = gum_invocation_context_get_nth_argument (ic, 0);

  replacement_method = get_replacement_method (method);
  if (replacement_method != NULL)
    gum_invocation_context_replace_nth_argument (ic, 0, replacement_method);
}

gpointer
on_art_method_get_oat_quick_method_header (gpointer method,
                                           gpointer pc)
{
  if (is_replacement_method (method))
    return NULL;

  return get_oat_quick_method_header_impl (method, pc);
}

void
on_art_method_pretty_method (GumInvocationContext * ic)
{
  const guint this_arg_index = ${Process.arch==="arm64"?0:1};
  gpointer method;

  method = gum_invocation_context_get_nth_argument (ic, this_arg_index);
  if (method == NULL)
    gum_invocation_context_replace_nth_argument (ic, this_arg_index, last_seen_art_method);
  else
    last_seen_art_method = method;
}

void
on_leave_gc_concurrent_copying_copying_phase (GumInvocationContext * ic)
{
  GHashTableIter iter;
  gpointer hooked_method, replacement_method;

  g_mutex_lock (&lock);

  g_hash_table_iter_init (&iter, methods);
  while (g_hash_table_iter_next (&iter, &hooked_method, &replacement_method))
    *((uint32_t *) replacement_method) = *((uint32_t *) hooked_method);

  g_mutex_unlock (&lock);
}
`,o=8,i=x,a=x,c=x,d=Memory.alloc(o+i+a+c),f=d.add(o),h=f.add(i),u=h.add(a),m=t.find(x===4?"_ZN3art9ArtMethod23GetOatQuickMethodHeaderEj":"_ZN3art9ArtMethod23GetOatQuickMethodHeaderEm"),p=new CModule(s,{lock:d,methods:f,replacements:h,last_seen_art_method:u,get_oat_quick_method_header_impl:m??ptr("0xdeadbeef")}),g={exceptions:"propagate",scheduling:"exclusive"};return{handle:p,replacedMethods:{isReplacement:new NativeFunction(p.is_replacement_method,"bool",["pointer"],g),get:new NativeFunction(p.get_replacement_method,"pointer",["pointer"],g),set:new NativeFunction(p.set_replacement_method,"void",["pointer","pointer"],g),synchronize:new NativeFunction(p.synchronize_replacement_methods,"void",["uint","pointer","pointer"],g),delete:new NativeFunction(p.delete_replacement_method,"void",["pointer"],g),translate:new NativeFunction(p.translate_method,"pointer",["pointer"],g),findReplacementFromQuickCode:p.find_replacement_method_from_quick_code},getOatQuickMethodHeaderImpl:m,hooks:{Interpreter:{doCall:p.on_interpreter_do_call},ArtMethod:{getOatQuickMethodHeader:p.on_art_method_get_oat_quick_method_header,prettyMethod:p.on_art_method_pretty_method},Gc:{copyingPhase:{onLeave:p.on_leave_gc_concurrent_copying_copying_phase},runFlip:{onEnter:p.on_leave_gc_concurrent_copying_copying_phase}}}}}function yl(t){ms||(ms=!0,bl(t),El(),Sl(),vl())}function bl(t){let e=Z();[e.artQuickGenericJniTrampoline,e.artQuickToInterpreterBridge,e.artQuickResolutionTrampoline].forEach(r=>{Memory.protect(r,32,"rwx");let s=new Jt(r);s.activate(t),js.push(s)})}function El(){let t=Z(),e=le(),{isApiLevel34OrApexEquivalent:n}=t,r;if(e<=22)r=/^_ZN3art11interpreter6DoCallILb[0-1]ELb[0-1]EEEbPNS_6mirror9ArtMethodEPNS_6ThreadERNS_11ShadowFrameEPKNS_11InstructionEtPNS_6JValueE$/;else if(e<=33&&!n)r=/^_ZN3art11interpreter6DoCallILb[0-1]ELb[0-1]EEEbPNS_9ArtMethodEPNS_6ThreadERNS_11ShadowFrameEPKNS_11InstructionEtPNS_6JValueE$/;else if(n)r=/^_ZN3art11interpreter6DoCallILb[0-1]EEEbPNS_9ArtMethodEPNS_6ThreadERNS_11ShadowFrameEPKNS_11InstructionEtbPNS_6JValueE$/;else throw new Error("Unable to find method invocation in ART; please file a bug");let s=t.module,o=[...s.enumerateExports(),...s.enumerateSymbols()].filter(i=>r.test(i.name));if(o.length===0)throw new Error("Unable to find method invocation in ART; please file a bug");for(let i of o)Interceptor.attach(i.address,fe.hooks.Interpreter.doCall)}function Sl(){let t=Z(),n=t.module.findSymbolByName("_ZN3art2gc4Heap22CollectGarbageInternalENS0_9collector6GcTypeENS0_7GcCauseEbj");if(n===null)return;let{artNterpEntryPoint:r,artQuickToInterpreterBridge:s}=t,o=xe(t.vm).offset.quickCode;Interceptor.attach(n,{onLeave(){fe.replacedMethods.synchronize(o,r,s)}})}function vl(){let t=[["_ZN3art11ClassLinker26VisiblyInitializedCallback22MarkVisiblyInitializedEPNS_6ThreadE","e90340f8 : ff0ff0ff"],["_ZN3art11ClassLinker26VisiblyInitializedCallback29AdjustThreadVisibilityCounterEPNS_6ThreadEl","7f0f00f9 : 1ffcffff"]],e=Z(),n=e.module;for(let[r,s]of t){let o=n.findSymbolByName(r);if(o===null)continue;let i=Memory.scanSync(o,8192,s);if(i.length===0)return;let{artNterpEntryPoint:a,artQuickToInterpreterBridge:c}=e,l=xe(e.vm).offset.quickCode;Interceptor.attach(i[0].address,function(){fe.replacedMethods.synchronize(l,a,c)});return}}function wl(t){if(ps)return;if(ps=!0,!xl()){let{getOatQuickMethodHeaderImpl:o}=fe;if(o===null)return;try{Interceptor.replace(o,fe.hooks.ArtMethod.getOatQuickMethodHeader)}catch{}}let e=le(),n=null,r=Z();e>28?n=r.find("_ZN3art2gc9collector17ConcurrentCopying12CopyingPhaseEv"):e>22&&(n=r.find("_ZN3art2gc9collector17ConcurrentCopying12MarkingPhaseEv")),n!==null&&Interceptor.attach(n,fe.hooks.Gc.copyingPhase);let s=null;s=r.find("_ZN3art6Thread15RunFlipFunctionEPS0_"),s===null&&(s=r.find("_ZN3art6Thread15RunFlipFunctionEPS0_b")),s!==null&&Interceptor.attach(s,fe.hooks.Gc.runFlip)}var Tl={arm:{signatures:[{pattern:["b0 68","01 30","0c d0","1b 98",":","c0 ff","c0 ff","00 ff","00 2f"],validateMatch:$n},{pattern:["d8 f8 08 00","01 30","0c d0","1b 98",":","f0 ff ff 0f","ff ff","00 ff","00 2f"],validateMatch:$n},{pattern:["b0 68","01 30","40 f0 c3 80","00 25",":","c0 ff","c0 ff","c0 fb 00 d0","ff f8"],validateMatch:$n}],instrument:Nl},arm64:{signatures:[{pattern:["0a 40 b9","1f 05 00 31","40 01 00 54","88 39 00 f0",":","fc ff ff","1f fc ff ff","1f 00 00 ff","00 00 00 9f"],offset:1,validateMatch:Jn},{pattern:["0a 40 b9","1f 05 00 31","40 01 00 54","00 0e 40 f9",":","fc ff ff","1f fc ff ff","1f 00 00 ff","00 fc ff ff"],offset:1,validateMatch:Jn},{pattern:["0a 40 b9","1f 05 00 31","01 34 00 54","e0 03 1f aa",":","fc ff ff","1f fc ff ff","1f 00 00 ff","e0 ff ff ff"],offset:1,validateMatch:Jn}],instrument:Ll}};function $n({address:t,size:e}){let n=Instruction.parse(t.or(1)),[r,s]=n.operands,o=s.value.base,i=r.value,a=Instruction.parse(n.next.add(2)),c=ptr(a.operands[0].value),l=a.address.add(a.size),d,f;return a.mnemonic==="beq"?(d=l,f=c):(d=c,f=l),De(d.or(1),h,{limit:3});function h(u){let{mnemonic:m}=u;if(!(m==="ldr"||m==="ldr.w"))return null;let{base:p,disp:g}=u.operands[1].value;return p===o&&g===20?{methodReg:o,scratchReg:i,target:{whenTrue:c,whenRegularMethod:d,whenRuntimeMethod:f}}:null}}function Jn({address:t,size:e}){let[n,r]=Instruction.parse(t).operands,s=r.value.base,o="x"+n.value.substring(1),i=Instruction.parse(t.add(8)),a=ptr(i.operands[0].value),c=t.add(12),l,d;return i.mnemonic==="b.eq"?(l=c,d=a):(l=a,d=c),De(l,f,{limit:3});function f(h){if(h.mnemonic!=="ldr")return null;let{base:u,disp:m}=h.operands[1].value;return u===s&&m===24?{methodReg:s,scratchReg:o,target:{whenTrue:a,whenRegularMethod:l,whenRuntimeMethod:d}}:null}}function xl(){if(le()<31)return!1;let t=Tl[Process.arch];if(t===void 0)return!1;let e=t.signatures.map(({pattern:r,offset:s=0,validateMatch:o=Al})=>({pattern:new MatchPattern(r.join("")),offset:s,validateMatch:o})),n=[];for(let{base:r,size:s}of Z().module.enumerateRanges("--x"))for(let{pattern:o,offset:i,validateMatch:a}of e){let c=Memory.scanSync(r,s,o).map(({address:l,size:d})=>({address:l.sub(i),size:d+i})).filter(l=>{let d=a(l);return d===null?!1:(l.validationResult=d,!0)});n.push(...c)}return n.length===0?!1:(n.forEach(t.instrument),!0)}function Al(){return{}}var $t=class{constructor(e,n,r){this.address=e,this.size=n,this.originalCode=e.readByteArray(n),this.trampoline=r}revert(){Memory.patchCode(this.address,this.size,e=>{e.writeByteArray(this.originalCode)})}};function Nl({address:t,size:e,validationResult:n}){let{methodReg:r,target:s}=n,o=Memory.alloc(Process.pageSize),i=e;Memory.patchCode(o,256,a=>{let c=new ThumbWriter(a,{pc:o}),l=new ThumbRelocator(t,c);for(let m=0;m!==2;m++)l.readOne();l.writeAll(),l.readOne(),l.skipOne(),c.putBCondLabel("eq","runtime_or_replacement_method");let d=[45,237,16,10];c.putBytes(d);let f=["r0","r1","r2","r3"];c.putPushRegs(f),c.putCallAddressWithArguments(fe.replacedMethods.isReplacement,[r]),c.putCmpRegImm("r0",0),c.putPopRegs(f);let h=[189,236,16,10];c.putBytes(h),c.putBCondLabel("ne","runtime_or_replacement_method"),c.putBLabel("regular_method"),l.readOne();let u=l.input.address.equals(s.whenRegularMethod);for(c.putLabel(u?"regular_method":"runtime_or_replacement_method"),l.writeOne();i<10;){let m=l.readOne();if(m===0){i=10;break}i=m}l.writeAll(),c.putBranchAddress(t.add(i+1)),c.putLabel(u?"runtime_or_replacement_method":"regular_method"),c.putBranchAddress(s.whenTrue),c.flush()}),ir.push(new $t(t,i,o)),Memory.patchCode(t,i,a=>{let c=new ThumbWriter(a,{pc:t});c.putLdrRegAddress("pc",o.or(1)),c.flush()})}function Ll({address:t,size:e,validationResult:n}){let{methodReg:r,scratchReg:s,target:o}=n,i=Memory.alloc(Process.pageSize);Memory.patchCode(i,256,a=>{let c=new Arm64Writer(a,{pc:i}),l=new Arm64Relocator(t,c);for(let m=0;m!==2;m++)l.readOne();l.writeAll(),l.readOne(),l.skipOne(),c.putBCondLabel("eq","runtime_or_replacement_method");let d=["d0","d1","d2","d3","d4","d5","d6","d7","x0","x1","x2","x3","x4","x5","x6","x7","x8","x9","x10","x11","x12","x13","x14","x15","x16","x17"],f=d.length;for(let m=0;m!==f;m+=2)c.putPushRegReg(d[m],d[m+1]);c.putCallAddressWithArguments(fe.replacedMethods.isReplacement,[r]),c.putCmpRegReg("x0","xzr");for(let m=f-2;m>=0;m-=2)c.putPopRegReg(d[m],d[m+1]);c.putBCondLabel("ne","runtime_or_replacement_method"),c.putBLabel("regular_method"),l.readOne();let h=l.input,u=h.address.equals(o.whenRegularMethod);c.putLabel(u?"regular_method":"runtime_or_replacement_method"),l.writeOne(),c.putBranchAddress(h.next),c.putLabel(u?"runtime_or_replacement_method":"regular_method"),c.putBranchAddress(o.whenTrue),c.flush()}),ir.push(new $t(t,e,i)),Memory.patchCode(t,e,a=>{let c=new Arm64Writer(a,{pc:t});c.putLdrRegAddress(s,i),c.putBrReg(s),c.flush()})}function Ml(t){return new ks(t)}function kl(t){return fe.replacedMethods.translate(t)}function fr(t,e={}){let{limit:n=16}=e,r=t.getEnv();return bt===null&&(bt=jl(t,r)),bt.backtrace(r,n)}function jl(t,e){let n=Z(),r=Memory.alloc(Process.pointerSize),s=new CModule(`
#include <glib.h>
#include <stdbool.h>
#include <string.h>
#include <gum/gumtls.h>
#include <json-glib/json-glib.h>

typedef struct _ArtBacktrace ArtBacktrace;
typedef struct _ArtStackFrame ArtStackFrame;

typedef struct _ArtStackVisitor ArtStackVisitor;
typedef struct _ArtStackVisitorVTable ArtStackVisitorVTable;

typedef struct _ArtClass ArtClass;
typedef struct _ArtMethod ArtMethod;
typedef struct _ArtThread ArtThread;
typedef struct _ArtContext ArtContext;

typedef struct _JNIEnv JNIEnv;

typedef struct _StdString StdString;
typedef struct _StdTinyString StdTinyString;
typedef struct _StdLargeString StdLargeString;

typedef enum {
  STACK_WALK_INCLUDE_INLINED_FRAMES,
  STACK_WALK_SKIP_INLINED_FRAMES,
} StackWalkKind;

struct _StdTinyString
{
  guint8 unused;
  gchar data[(3 * sizeof (gpointer)) - 1];
};

struct _StdLargeString
{
  gsize capacity;
  gsize size;
  gchar * data;
};

struct _StdString
{
  union
  {
    guint8 flags;
    StdTinyString tiny;
    StdLargeString large;
  };
};

struct _ArtBacktrace
{
  GChecksum * id;
  GArray * frames;
  gchar * frames_json;
};

struct _ArtStackFrame
{
  ArtMethod * method;
  gsize dexpc;
  StdString description;
};

struct _ArtStackVisitorVTable
{
  void (* unused1) (void);
  void (* unused2) (void);
  bool (* visit) (ArtStackVisitor * visitor);
};

struct _ArtStackVisitor
{
  ArtStackVisitorVTable * vtable;

  guint8 padding[512];

  ArtStackVisitorVTable vtable_storage;

  ArtBacktrace * backtrace;
};

struct _ArtMethod
{
  guint32 declaring_class;
  guint32 access_flags;
};

extern GumTlsKey current_backtrace;

extern void (* perform_art_thread_state_transition) (JNIEnv * env);

extern ArtContext * art_make_context (ArtThread * thread);

extern void art_stack_visitor_init (ArtStackVisitor * visitor, ArtThread * thread, void * context, StackWalkKind walk_kind,
    size_t num_frames, bool check_suspended);
extern void art_stack_visitor_walk_stack (ArtStackVisitor * visitor, bool include_transitions);
extern ArtMethod * art_stack_visitor_get_method (ArtStackVisitor * visitor);
extern void art_stack_visitor_describe_location (StdString * description, ArtStackVisitor * visitor);
extern ArtMethod * translate_method (ArtMethod * method);
extern void translate_location (ArtMethod * method, guint32 pc, const gchar ** source_file, gint32 * line_number);
extern void get_class_location (StdString * result, ArtClass * klass);
extern void cxx_delete (void * mem);
extern unsigned long strtoul (const char * str, char ** endptr, int base);

static bool visit_frame (ArtStackVisitor * visitor);
static void art_stack_frame_destroy (ArtStackFrame * frame);

static void append_jni_type_name (GString * s, const gchar * name, gsize length);

static void std_string_destroy (StdString * str);
static gchar * std_string_get_data (StdString * str);

void
init (void)
{
  current_backtrace = gum_tls_key_new ();
}

void
finalize (void)
{
  gum_tls_key_free (current_backtrace);
}

ArtBacktrace *
_create (JNIEnv * env,
         guint limit)
{
  ArtBacktrace * bt;

  bt = g_new (ArtBacktrace, 1);
  bt->id = g_checksum_new (G_CHECKSUM_SHA1);
  bt->frames = (limit != 0)
      ? g_array_sized_new (FALSE, FALSE, sizeof (ArtStackFrame), limit)
      : g_array_new (FALSE, FALSE, sizeof (ArtStackFrame));
  g_array_set_clear_func (bt->frames, (GDestroyNotify) art_stack_frame_destroy);
  bt->frames_json = NULL;

  gum_tls_key_set_value (current_backtrace, bt);

  perform_art_thread_state_transition (env);

  gum_tls_key_set_value (current_backtrace, NULL);

  return bt;
}

void
_on_thread_state_transition_complete (ArtThread * thread)
{
  ArtContext * context;
  ArtStackVisitor visitor = {
    .vtable_storage = {
      .visit = visit_frame,
    },
  };

  context = art_make_context (thread);

  art_stack_visitor_init (&visitor, thread, context, STACK_WALK_SKIP_INLINED_FRAMES, 0, true);
  visitor.vtable = &visitor.vtable_storage;
  visitor.backtrace = gum_tls_key_get_value (current_backtrace);

  art_stack_visitor_walk_stack (&visitor, false);

  cxx_delete (context);
}

static bool
visit_frame (ArtStackVisitor * visitor)
{
  ArtBacktrace * bt = visitor->backtrace;
  ArtStackFrame frame;
  const gchar * description, * dexpc_part;

  frame.method = art_stack_visitor_get_method (visitor);

  art_stack_visitor_describe_location (&frame.description, visitor);

  description = std_string_get_data (&frame.description);
  if (strstr (description, " '<") != NULL)
    goto skip;

  dexpc_part = strstr (description, " at dex PC 0x");
  if (dexpc_part == NULL)
    goto skip;
  frame.dexpc = strtoul (dexpc_part + 13, NULL, 16);

  g_array_append_val (bt->frames, frame);

  g_checksum_update (bt->id, (guchar *) &frame.method, sizeof (frame.method));
  g_checksum_update (bt->id, (guchar *) &frame.dexpc, sizeof (frame.dexpc));

  return true;

skip:
  std_string_destroy (&frame.description);
  return true;
}

static void
art_stack_frame_destroy (ArtStackFrame * frame)
{
  std_string_destroy (&frame->description);
}

void
_destroy (ArtBacktrace * backtrace)
{
  g_free (backtrace->frames_json);
  g_array_free (backtrace->frames, TRUE);
  g_checksum_free (backtrace->id);
  g_free (backtrace);
}

const gchar *
_get_id (ArtBacktrace * backtrace)
{
  return g_checksum_get_string (backtrace->id);
}

const gchar *
_get_frames (ArtBacktrace * backtrace)
{
  GArray * frames = backtrace->frames;
  JsonBuilder * b;
  guint i;
  JsonNode * root;

  if (backtrace->frames_json != NULL)
    return backtrace->frames_json;

  b = json_builder_new_immutable ();

  json_builder_begin_array (b);

  for (i = 0; i != frames->len; i++)
  {
    ArtStackFrame * frame = &g_array_index (frames, ArtStackFrame, i);
    gchar * description, * ret_type, * paren_open, * paren_close, * arg_types, * token, * method_name, * class_name;
    GString * signature;
    gchar * cursor;
    ArtMethod * translated_method;
    StdString location;
    gsize dexpc;
    const gchar * source_file;
    gint32 line_number;

    description = std_string_get_data (&frame->description);

    ret_type = strchr (description, '\\'') + 1;

    paren_open = strchr (ret_type, '(');
    paren_close = strchr (paren_open, ')');
    *paren_open = '\\0';
    *paren_close = '\\0';

    arg_types = paren_open + 1;

    token = strrchr (ret_type, '.');
    *token = '\\0';

    method_name = token + 1;

    token = strrchr (ret_type, ' ');
    *token = '\\0';

    class_name = token + 1;

    signature = g_string_sized_new (128);

    append_jni_type_name (signature, class_name, method_name - class_name - 1);
    g_string_append_c (signature, ',');
    g_string_append (signature, method_name);
    g_string_append (signature, ",(");

    if (arg_types != paren_close)
    {
      for (cursor = arg_types; cursor != NULL;)
      {
        gsize length;
        gchar * next;

        token = strstr (cursor, ", ");
        if (token != NULL)
        {
          length = token - cursor;
          next = token + 2;
        }
        else
        {
          length = paren_close - cursor;
          next = NULL;
        }

        append_jni_type_name (signature, cursor, length);

        cursor = next;
      }
    }

    g_string_append_c (signature, ')');

    append_jni_type_name (signature, ret_type, class_name - ret_type - 1);

    translated_method = translate_method (frame->method);
    dexpc = (translated_method == frame->method) ? frame->dexpc : 0;

    get_class_location (&location, GSIZE_TO_POINTER (translated_method->declaring_class));

    translate_location (translated_method, dexpc, &source_file, &line_number);

    json_builder_begin_object (b);

    json_builder_set_member_name (b, "signature");
    json_builder_add_string_value (b, signature->str);

    json_builder_set_member_name (b, "origin");
    json_builder_add_string_value (b, std_string_get_data (&location));

    json_builder_set_member_name (b, "className");
    json_builder_add_string_value (b, class_name);

    json_builder_set_member_name (b, "methodName");
    json_builder_add_string_value (b, method_name);

    json_builder_set_member_name (b, "methodFlags");
    json_builder_add_int_value (b, translated_method->access_flags);

    json_builder_set_member_name (b, "fileName");
    json_builder_add_string_value (b, source_file);

    json_builder_set_member_name (b, "lineNumber");
    json_builder_add_int_value (b, line_number);

    json_builder_end_object (b);

    std_string_destroy (&location);
    g_string_free (signature, TRUE);
  }

  json_builder_end_array (b);

  root = json_builder_get_root (b);
  backtrace->frames_json = json_to_string (root, FALSE);
  json_node_unref (root);

  return backtrace->frames_json;
}

static void
append_jni_type_name (GString * s,
                      const gchar * name,
                      gsize length)
{
  gchar shorty = '\\0';
  gsize i;

  switch (name[0])
  {
    case 'b':
      if (strncmp (name, "boolean", length) == 0)
        shorty = 'Z';
      else if (strncmp (name, "byte", length) == 0)
        shorty = 'B';
      break;
    case 'c':
      if (strncmp (name, "char", length) == 0)
        shorty = 'C';
      break;
    case 'd':
      if (strncmp (name, "double", length) == 0)
        shorty = 'D';
      break;
    case 'f':
      if (strncmp (name, "float", length) == 0)
        shorty = 'F';
      break;
    case 'i':
      if (strncmp (name, "int", length) == 0)
        shorty = 'I';
      break;
    case 'l':
      if (strncmp (name, "long", length) == 0)
        shorty = 'J';
      break;
    case 's':
      if (strncmp (name, "short", length) == 0)
        shorty = 'S';
      break;
    case 'v':
      if (strncmp (name, "void", length) == 0)
        shorty = 'V';
      break;
  }

  if (shorty != '\\0')
  {
    g_string_append_c (s, shorty);

    return;
  }

  if (length > 2 && name[length - 2] == '[' && name[length - 1] == ']')
  {
    g_string_append_c (s, '[');
    append_jni_type_name (s, name, length - 2);

    return;
  }

  g_string_append_c (s, 'L');

  for (i = 0; i != length; i++)
  {
    gchar ch = name[i];
    if (ch != '.')
      g_string_append_c (s, ch);
    else
      g_string_append_c (s, '/');
  }

  g_string_append_c (s, ';');
}

static void
std_string_destroy (StdString * str)
{
  bool is_large = (str->flags & 1) != 0;
  if (is_large)
    cxx_delete (str->large.data);
}

static gchar *
std_string_get_data (StdString * str)
{
  bool is_large = (str->flags & 1) != 0;
  return is_large ? str->large.data : str->tiny.data;
}
`,{current_backtrace:Memory.alloc(Process.pointerSize),perform_art_thread_state_transition:r,art_make_context:n["art::Thread::GetLongJumpContext"]??n["art::Context::Create"],art_stack_visitor_init:n["art::StackVisitor::StackVisitor"],art_stack_visitor_walk_stack:n["art::StackVisitor::WalkStack"],art_stack_visitor_get_method:n["art::StackVisitor::GetMethod"],art_stack_visitor_describe_location:n["art::StackVisitor::DescribeLocation"],translate_method:fe.replacedMethods.translate,translate_location:n["art::Monitor::TranslateLocation"],get_class_location:n["art::mirror::Class::GetLocation"],cxx_delete:n.$delete,strtoul:Process.getModuleByName("libc.so").getExportByName("strtoul")}),o=new NativeFunction(s._create,"pointer",["pointer","uint"],X),i=new NativeFunction(s._destroy,"void",["pointer"],X),a={exceptions:"propagate",scheduling:"exclusive"},c=new NativeFunction(s._get_id,"pointer",["pointer"],a),l=new NativeFunction(s._get_frames,"pointer",["pointer"],a),d=Is(t,e,s._on_thread_state_transition_complete);s._performData=d,r.writePointer(d),s.backtrace=(h,u)=>{let m=o(h,u),p=new Xn(m);return Script.bindWeak(p,f.bind(null,m)),p};function f(h){i(h)}return s.getId=h=>c(h).readUtf8String(),s.getFrames=h=>JSON.parse(l(h).readUtf8String()),s}var Xn=class{constructor(e){this.handle=e}get id(){return bt.getId(this.handle)}get frames(){return bt.getFrames(this.handle)}};function hr(){Vt.forEach(t=>{t.vtablePtr.writePointer(t.vtable),t.vtableCountPtr.writeS32(t.vtableCount)}),Vt.clear();for(let t of js.splice(0))t.deactivate();for(let t of ir.splice(0))t.revert()}function pr(t){return Rs(t,"art::jni::JniIdManager::DecodeMethodId")}function Ss(t){return Rs(t,"art::jni::JniIdManager::DecodeFieldId")}function Rs(t,e){let n=Z(),r=Ls(n).offset,s=r.jniIdManager,o=r.jniIdsIndirection;if(s!==null&&o!==null){let i=n.artRuntime;if(i.add(o).readInt()!==rc){let c=i.add(s).readPointer();return n[e](c,t)}}return t}var Ol={ia32:Rl,x64:Pl,arm:Il,arm64:Fl};function Rl(t,e,n,r,s){let o=rt(s).offset,i=xe(s).offset,a;return Memory.patchCode(t,128,c=>{let l=new X86Writer(c,{pc:t}),d=new X86Relocator(e,l),f=[15,174,4,36],h=[15,174,12,36];l.putPushax(),l.putMovRegReg("ebp","esp"),l.putAndRegU32("esp",4294967280),l.putSubRegImm("esp",512),l.putBytes(f),l.putMovRegFsU32Ptr("ebx",o.self),l.putCallAddressWithAlignedArguments(fe.replacedMethods.findReplacementFromQuickCode,["eax","ebx"]),l.putTestRegReg("eax","eax"),l.putJccShortLabel("je","restore_registers","no-hint"),l.putMovRegOffsetPtrReg("ebp",7*4,"eax"),l.putLabel("restore_registers"),l.putBytes(h),l.putMovRegReg("esp","ebp"),l.putPopax(),l.putJccShortLabel("jne","invoke_replacement","no-hint");do a=d.readOne();while(a<n&&!d.eoi);d.writeAll(),d.eoi||l.putJmpAddress(e.add(a)),l.putLabel("invoke_replacement"),l.putJmpRegOffsetPtr("eax",i.quickCode),l.flush()}),a}function Pl(t,e,n,r,s){let o=rt(s).offset,i=xe(s).offset,a;return Memory.patchCode(t,256,c=>{let l=new X86Writer(c,{pc:t}),d=new X86Relocator(e,l),f=[15,174,4,36],h=[15,174,12,36];l.putPushax(),l.putMovRegReg("rbp","rsp"),l.putAndRegU32("rsp",4294967280),l.putSubRegImm("rsp",512),l.putBytes(f),l.putMovRegGsU32Ptr("rbx",o.self),l.putCallAddressWithAlignedArguments(fe.replacedMethods.findReplacementFromQuickCode,["rdi","rbx"]),l.putTestRegReg("rax","rax"),l.putJccShortLabel("je","restore_registers","no-hint"),l.putMovRegOffsetPtrReg("rbp",8*8,"rax"),l.putLabel("restore_registers"),l.putBytes(h),l.putMovRegReg("rsp","rbp"),l.putPopax(),l.putJccShortLabel("jne","invoke_replacement","no-hint");do a=d.readOne();while(a<n&&!d.eoi);d.writeAll(),d.eoi||l.putJmpAddress(e.add(a)),l.putLabel("invoke_replacement"),l.putJmpRegOffsetPtr("rdi",i.quickCode),l.flush()}),a}function Il(t,e,n,r,s){let o=xe(s).offset,i=e.and(sr),a;return Memory.patchCode(t,128,c=>{let l=new ThumbWriter(c,{pc:t}),d=new ThumbRelocator(i,l),f=[45,237,16,10],h=[189,236,16,10];l.putPushRegs(["r1","r2","r3","r5","r6","r7","r8","r10","r11","lr"]),l.putBytes(f),l.putSubRegRegImm("sp","sp",8),l.putStrRegRegOffset("r0","sp",0),l.putCallAddressWithArguments(fe.replacedMethods.findReplacementFromQuickCode,["r0","r9"]),l.putCmpRegImm("r0",0),l.putBCondLabel("eq","restore_registers"),l.putStrRegRegOffset("r0","sp",0),l.putLabel("restore_registers"),l.putLdrRegRegOffset("r0","sp",0),l.putAddRegRegImm("sp","sp",8),l.putBytes(h),l.putPopRegs(["lr","r11","r10","r8","r7","r6","r5","r3","r2","r1"]),l.putBCondLabel("ne","invoke_replacement");do a=d.readOne();while(a<n&&!d.eoi);d.writeAll(),d.eoi||l.putLdrRegAddress("pc",e.add(a)),l.putLabel("invoke_replacement"),l.putLdrRegRegOffset("pc","r0",o.quickCode),l.flush()}),a}function Fl(t,e,n,{availableScratchRegs:r},s){let o=xe(s).offset,i;return Memory.patchCode(t,256,a=>{let c=new Arm64Writer(a,{pc:t}),l=new Arm64Relocator(e,c);c.putPushRegReg("d0","d1"),c.putPushRegReg("d2","d3"),c.putPushRegReg("d4","d5"),c.putPushRegReg("d6","d7"),c.putPushRegReg("x1","x2"),c.putPushRegReg("x3","x4"),c.putPushRegReg("x5","x6"),c.putPushRegReg("x7","x20"),c.putPushRegReg("x21","x22"),c.putPushRegReg("x23","x24"),c.putPushRegReg("x25","x26"),c.putPushRegReg("x27","x28"),c.putPushRegReg("x29","lr"),c.putSubRegRegImm("sp","sp",16),c.putStrRegRegOffset("x0","sp",0),c.putCallAddressWithArguments(fe.replacedMethods.findReplacementFromQuickCode,["x0","x19"]),c.putCmpRegReg("x0","xzr"),c.putBCondLabel("eq","restore_registers"),c.putStrRegRegOffset("x0","sp",0),c.putLabel("restore_registers"),c.putLdrRegRegOffset("x0","sp",0),c.putAddRegRegImm("sp","sp",16),c.putPopRegReg("x29","lr"),c.putPopRegReg("x27","x28"),c.putPopRegReg("x25","x26"),c.putPopRegReg("x23","x24"),c.putPopRegReg("x21","x22"),c.putPopRegReg("x7","x20"),c.putPopRegReg("x5","x6"),c.putPopRegReg("x3","x4"),c.putPopRegReg("x1","x2"),c.putPopRegReg("d6","d7"),c.putPopRegReg("d4","d5"),c.putPopRegReg("d2","d3"),c.putPopRegReg("d0","d1"),c.putBCondLabel("ne","invoke_replacement");do i=l.readOne();while(i<n&&!l.eoi);if(l.writeAll(),!l.eoi){let d=Array.from(r)[0];c.putLdrRegAddress(d,e.add(i)),c.putBrReg(d)}c.putLabel("invoke_replacement"),c.putLdrRegRegOffset("x16","x0",o.quickCode),c.putBrReg("x16"),c.flush()}),i}var Cl={ia32:vs,x64:vs,arm:Ul,arm64:Dl};function vs(t,e,n){Memory.patchCode(t,16,r=>{let s=new X86Writer(r,{pc:t});s.putJmpAddress(e),s.flush()})}function Ul(t,e,n){let r=t.and(sr);Memory.patchCode(r,16,s=>{let o=new ThumbWriter(s,{pc:r});o.putLdrRegAddress("pc",e.or(1)),o.flush()})}function Dl(t,e,n){Memory.patchCode(t,16,r=>{let s=new Arm64Writer(r,{pc:t});n===16?s.putLdrRegAddress("x16",e):s.putAdrpRegAddress("x16",e),s.putBrReg("x16"),s.flush()})}var zl={ia32:5,x64:16,arm:8,arm64:16},Jt=class{constructor(e){this.quickCode=e,this.quickCodeAddress=Process.arch==="arm"?e.and(sr):e,this.redirectSize=0,this.trampoline=null,this.overwrittenPrologue=null,this.overwrittenPrologueLength=0}_canRelocateCode(e,n){let r=Qn[Process.arch],s=ml[Process.arch],{quickCodeAddress:o}=this,i=new r(o),a=new s(o,i),c;if(Process.arch==="arm64"){let l=new Set(["x16","x17"]);do{let d=a.readOne(),f=new Set(l),{read:h,written:u}=a.input.regsAccessed;for(let m of[h,u])for(let p of m){let g;p.startsWith("w")?g="x"+p.substring(1):g=p,f.delete(g)}if(f.size===0)break;c=d,l=f}while(c<e&&!a.eoi);n.availableScratchRegs=l}else do c=a.readOne();while(c<e&&!a.eoi);return c>=e}_allocateTrampoline(){Ut===null&&(Ut=En(x===4?128:256));let e=zl[Process.arch],n,r,s=1,o={};if(x===4||this._canRelocateCode(e,o))n=e,r={};else{let i;Process.arch==="x64"?(n=5,i=sc):Process.arch==="arm64"&&(n=8,i=oc,s=4096),r={near:this.quickCodeAddress,maxDistance:i}}return this.redirectSize=n,this.trampoline=Ut.allocateSlice(r,s),o}_destroyTrampoline(){Ut.freeSlice(this.trampoline)}activate(e){let n=this._allocateTrampoline(),{trampoline:r,quickCode:s,redirectSize:o}=this,i=Ol[Process.arch],a=i(r,s,o,n,e);this.overwrittenPrologueLength=a,this.overwrittenPrologue=Memory.dup(this.quickCodeAddress,a);let c=Cl[Process.arch];c(s,r,o)}deactivate(){let{quickCodeAddress:e,overwrittenPrologueLength:n}=this,r=Qn[Process.arch];Memory.patchCode(e,n,s=>{let o=new r(s,{pc:e}),{overwrittenPrologue:i}=this;o.putBytes(i.readByteArray(n)),o.flush()}),this._destroyTrampoline()}};function Gl(t){let e=Z(),{module:n,artClassLinker:r}=e;return t.equals(r.quickGenericJniTrampoline)||t.equals(r.quickToInterpreterBridgeTrampoline)||t.equals(r.quickResolutionTrampoline)||t.equals(r.quickImtConflictTrampoline)||t.compare(n.base)>=0&&t.compare(n.base.add(n.size))<0}var er=class{constructor(e){let n=pr(e);this.methodId=n,this.originalMethod=null,this.hookedMethodId=n,this.replacementMethodId=null,this.interceptor=null}replace(e,n,r,s,o){let{kAccCompileDontBother:i,artNterpEntryPoint:a}=o;this.originalMethod=ws(this.methodId,s);let c=this.originalMethod.accessFlags;if((c&nc)!==0&&Vl()){let u=this.originalMethod.jniCode;this.hookedMethodId=u.add(2*x).readPointer(),this.originalMethod=ws(this.hookedMethodId,s)}let{hookedMethodId:l}=this,d=$l(l,s);this.replacementMethodId=d,Dt(d,{jniCode:e,accessFlags:(c&~(Ya|Ka|Hn)|Gt|i)>>>0,quickCode:o.artClassLinker.quickGenericJniTrampoline,interpreterCode:o.artInterpreterToCompiledCodeBridge},s);let f=As|Xa|Hn;(c&Gt)===0&&(f|=Qa),Dt(l,{accessFlags:(c&~f|i)>>>0},s);let h=this.originalMethod.quickCode;if(a!==null&&h.equals(a)&&Dt(l,{quickCode:o.artQuickToInterpreterBridge},s),!Gl(h)){let u=new Jt(h);u.activate(s),this.interceptor=u}fe.replacedMethods.set(l,d),_l(l,s)}revert(e){let{hookedMethodId:n,interceptor:r}=this;Dt(n,this.originalMethod,e),fe.replacedMethods.delete(n),r!==null&&(r.deactivate(),this.interceptor=null)}resolveTarget(e,n,r,s){return this.hookedMethodId}};function Vl(){return le()<28}function ws(t,e){let r=xe(e).offset;return["jniCode","accessFlags","quickCode","interpreterCode"].reduce((s,o)=>{let i=r[o];if(i===void 0)return s;let a=t.add(i),c=o==="accessFlags"?Ba:$a;return s[o]=c.call(a),s},{})}function Dt(t,e,n){let s=xe(n).offset;Object.keys(e).forEach(o=>{let i=s[o];if(i===void 0)return;let a=t.add(i);(o==="accessFlags"?Ja:Ha).call(a,e[o])})}var tr=class{constructor(e){this.methodId=e,this.originalMethod=null}replace(e,n,r,s,o){let{methodId:i}=this;this.originalMethod=Memory.dup(i,Cn);let a=r.reduce((h,u)=>h+u.size,0);n&&a++;let c=(i.add(us).readU32()|Gt)>>>0,l=a,d=0,f=a;i.add(us).writeU32(c),i.add(uc).writeU16(l),i.add(fc).writeU16(d),i.add(hc).writeU16(f),i.add(mc).writeU32(Bl(i)),o.dvmUseJNIBridge(i,e)}revert(e){Memory.copy(this.methodId,this.originalMethod,Cn)}resolveTarget(e,n,r,s){let o=r.handle.add(Ns).readPointer(),i;if(n)i=s.dvmDecodeIndirectRef(o,e.$h);else{let h=e.$borrowClassHandle(r);i=s.dvmDecodeIndirectRef(o,h.value),h.unref(r)}let a;n?a=i.add(lc).readPointer():a=i;let c=a.toString(16),l=Vt.get(c);if(l===void 0){let h=a.add(cc),u=a.add(ac),m=h.readPointer(),p=u.readS32(),g=p*x,y=Memory.alloc(2*g);Memory.copy(y,m,g),h.writePointer(y),l={classObject:a,vtablePtr:h,vtableCountPtr:u,vtable:m,vtableCount:p,shadowVtable:y,shadowVtableCount:p,targetMethods:new Map},Vt.set(c,l)}let d=this.methodId.toString(16),f=l.targetMethods.get(d);if(f===void 0){f=Memory.dup(this.originalMethod,Cn);let h=l.shadowVtableCount++;l.shadowVtable.add(h*x).writePointer(f),f.add(dc).writeU16(h),l.vtableCountPtr.writeS32(l.shadowVtableCount),l.targetMethods.set(d,f)}return f}};function Bl(t){if(Process.arch!=="ia32")return fs;let e=t.add(pc).readPointer().readCString();if(e===null||e.length===0||e.length>65535)return fs;let n;switch(e[0]){case"V":n=_c;break;case"F":n=gc;break;case"D":n=yc;break;case"J":n=bc;break;case"Z":case"B":n=wc;break;case"C":n=vc;break;case"S":n=Sc;break;default:n=Ec;break}let r=0;for(let s=e.length-1;s>0;s--){let o=e[s];r+=o==="D"||o==="J"?2:1}return n<<Tc|r}function $l(t,e){let n=Z();if(le()<23){let r=n["art::Thread::CurrentFromGdb"]();return n["art::mirror::Object::Clone"](t,r)}return Memory.dup(t,xe(e).size)}function mr(t,e,n){Ps(t,e,qn,n)}function _r(t,e){Ps(t,e,Zn)}function gr(t,e){let n=Z();if(le()<26)throw new Error("This API is only available on Android >= 8.0");Me(t,e,r=>{n["art::Runtime::DeoptimizeBootImage"](n.artRuntime)})}function Ps(t,e,n,r){let s=Z();if(le()<24)throw new Error("This API is only available on Android >= 7.0");Me(t,e,o=>{if(le()<30){if(!s.isJdwpStarted()){let a=Jl(s);Rc.push(a)}s.isDebuggerActive()||s["art::Dbg::GoActive"]();let i=Memory.alloc(8+x);switch(i.writeU32(n),n){case Zn:break;case qn:i.add(8).writePointer(r);break;default:throw new Error("Unsupported deoptimization kind")}s["art::Dbg::RequestDeoptimization"](i),s["art::Dbg::ManageDeoptimization"]()}else{let i=s.artInstrumentation;if(i===null)throw new Error("Unable to find Instrumentation class in ART; please file a bug");let a=s["art::Instrumentation::EnableDeoptimization"];switch(a!==void 0&&(i.add(Lc().offset.deoptimizationEnabled).readU8()||a(i)),n){case Zn:s["art::Instrumentation::DeoptimizeEverything"](i,Memory.allocUtf8String("frida"));break;case qn:s["art::Instrumentation::Deoptimize"](i,r);break;default:throw new Error("Unsupported deoptimization kind")}}})}var nr=class{constructor(){let e=Process.getModuleByName("libart.so"),n=e.getExportByName("_ZN3art4JDWP12JdwpAdbState6AcceptEv"),r=e.getExportByName("_ZN3art4JDWP12JdwpAdbState15ReceiveClientFdEv"),s=Ts(),o=Ts();this._controlFd=s[0],this._clientFd=o[0];let i=null;i=Interceptor.attach(n,function(a){let c=a[0];Memory.scanSync(c.add(8252),256,"00 ff ff ff ff 00")[0].address.add(1).writeS32(s[1]),i.detach()}),Interceptor.replace(r,new NativeCallback(function(a){return Interceptor.revert(r),o[1]},"int",["pointer"])),Interceptor.flush(),this._handshakeRequest=this._performHandshake()}async _performHandshake(){let e=new UnixInputStream(this._clientFd,{autoClose:!1}),n=new UnixOutputStream(this._clientFd,{autoClose:!1}),r=[74,68,87,80,45,72,97,110,100,115,104,97,107,101];try{await n.writeAll(r),await e.readAll(r.length)}catch{}}};function Jl(t){let e=new nr;t["art::Dbg::SetJdwpAllowed"](1);let n=Hl();t["art::Dbg::ConfigureJdwp"](n);let r=t["art::InternalDebuggerControlCallback::StartDebugger"];return r!==void 0?r(NULL):t["art::Dbg::StartJdwp"](),e}function Hl(){let t=le()<28?2:3,e=0,n=t,r=!0,s=!1,o=e,i=8+St+2,a=Memory.alloc(i);return a.writeU32(n).add(4).writeU8(r?1:0).add(1).writeU8(s?1:0).add(1).add(St).writeU16(o),a}function Ts(){Gn===null&&(Gn=new NativeFunction(Process.getModuleByName("libc.so").getExportByName("socketpair"),"int",["int","int","int","pointer"]));let t=Memory.alloc(8);if(Gn(Ac,Nc,0,t)===-1)throw new Error("Unable to create socketpair for JDWP");return[t.readS32(),t.add(4).readS32()]}function Zl(t){let e=Cc().offset,n=t.vm.add(e.globalsLock),r=t.vm.add(e.globals),s=t["art::IndirectReferenceTable::Add"],o=t["art::ReaderWriterMutex::ExclusiveLock"],i=t["art::ReaderWriterMutex::ExclusiveUnlock"],a=0;return function(c,l,d){o(n,l);try{return s(r,a,d)}finally{i(n,l)}}}function ql(t){let e=t["art::Thread::DecodeJObject"];if(e===void 0)throw new Error("art::Thread::DecodeJObject is not available; please file a bug");return function(n,r,s){return e(r,s)}}var Wl={ia32:xs,x64:xs,arm:Kl,arm64:Yl};function Is(t,e,n){let r=Z(),s=e.handle.readPointer(),o,i=r.find("_ZN3art3JNIILb1EE14ExceptionClearEP7_JNIEnv");i!==null?o=i:o=s.add(qt).readPointer();let a,c=r.find("_ZN3art3JNIILb1EE10FatalErrorEP7_JNIEnvPKc");c!==null?a=c:a=s.add(ic).readPointer();let l=Wl[Process.arch];if(l===void 0)throw new Error("Not yet implemented for "+Process.arch);let d=null,f=rt(t).offset,h=f.exception,u=new Set,m=f.isExceptionReportedToInstrumentation;m!==null&&u.add(m);let p=f.throwLocation;p!==null&&(u.add(p),u.add(p+x),u.add(p+2*x));let g=65536,y=Memory.alloc(g);return Memory.patchCode(y,g,E=>{d=l(E,y,o,a,h,u,n)}),d._code=y,d._callback=n,d}function xs(t,e,n,r,s,o,i){let a={},c=new Set,l=[n];for(;l.length>0;){let p=l.shift();if(Object.values(a).some(({begin:C,end:P})=>p.compare(C)>=0&&p.compare(P)<0))continue;let y=p.toString(),E={begin:p},O=null,k=!1;do{if(p.equals(r)){k=!0;break}let C=Instruction.parse(p);O=C;let P=a[C.address.toString()];if(P!==void 0){delete a[P.begin.toString()],a[y]=P,P.begin=E.begin,E=null;break}let I=null;switch(C.mnemonic){case"jmp":I=ptr(C.operands[0].value),k=!0;break;case"je":case"jg":case"jle":case"jne":case"js":I=ptr(C.operands[0].value);break;case"ret":k=!0;break}I!==null&&(c.add(I.toString()),l.push(I),l.sort((R,N)=>R.compare(N))),p=C.next}while(!k);E!==null&&(E.end=O.address.add(O.size),a[y]=E)}let d=Object.keys(a).map(p=>a[p]);d.sort((p,g)=>p.begin.compare(g.begin));let f=a[n.toString()];d.splice(d.indexOf(f),1),d.unshift(f);let h=new X86Writer(t,{pc:e}),u=!1,m=null;return d.forEach(p=>{let g=p.end.sub(p.begin).toInt32(),y=new X86Relocator(p.begin,h),E;for(;(E=y.readOne())!==0;){let O=y.input,{mnemonic:k}=O,C=O.address.toString();c.has(C)&&h.putLabel(C);let P=!0;switch(k){case"jmp":h.putJmpNearLabel(we(O.operands[0])),P=!1;break;case"je":case"jg":case"jle":case"jne":case"js":h.putJccNearLabel(k,we(O.operands[0]),"no-hint"),P=!1;break;case"mov":{let[I,R]=O.operands;if(I.type==="mem"&&R.type==="imm"){let N=I.value,T=N.disp;if(T===s&&R.value.valueOf()===0){if(m=N.base,h.putPushfx(),h.putPushax(),h.putMovRegReg("xbp","xsp"),x===4)h.putAndRegU32("esp",4294967280);else{let F=m!=="rdi"?"rdi":"rsi";h.putMovRegU64(F,uint64("0xfffffffffffffff0")),h.putAndRegReg("rsp",F)}h.putCallAddressWithAlignedArguments(i,[m]),h.putMovRegReg("xsp","xbp"),h.putPopax(),h.putPopfx(),u=!0,P=!1}else o.has(T)&&N.base===m&&(P=!1)}break}case"call":{let I=O.operands[0];I.type==="mem"&&I.value.disp===qt&&(x===4?(h.putPopReg("eax"),h.putMovRegRegOffsetPtr("eax","eax",4),h.putPushReg("eax")):h.putMovRegRegOffsetPtr("rdi","rdi",8),h.putCallAddressWithArguments(i,[]),u=!0,P=!1);break}}if(P?y.writeAll():y.skipOne(),E===g)break}y.dispose()}),h.dispose(),u||yr(),new NativeFunction(e,"void",["pointer"],X)}function Kl(t,e,n,r,s,o,i){let a={},c=new Set,l=ptr(1).not(),d=[n];for(;d.length>0;){let y=d.shift();if(Object.values(a).some(({begin:T,end:F})=>y.compare(T)>=0&&y.compare(F)<0))continue;let O=y.and(l),k=O.toString(),C=y.and(1),P={begin:O},I=null,R=!1,N=0;do{if(y.equals(r)){R=!0;break}let T;try{T=Instruction.parse(y)}catch($){if(I!==null){R=!0;break}throw $}let{mnemonic:F}=T;I=T;let U=y.and(l).toString(),V=a[U];if(V!==void 0){delete a[V.begin.toString()],a[k]=V,V.begin=P.begin,P=null;break}let B=N===0,G=null;switch(F){case"b":G=ptr(T.operands[0].value),R=B;break;case"beq.w":case"beq":case"bne":case"bne.w":case"bgt":G=ptr(T.operands[0].value);break;case"cbz":case"cbnz":G=ptr(T.operands[1].value);break;case"pop.w":B&&(R=T.operands.filter($=>$.value==="pc").length===1);break}switch(F){case"it":N=1;break;case"itt":N=2;break;case"ittt":N=3;break;case"itttt":N=4;break;default:N>0&&N--;break}G!==null&&(c.add(G.toString()),d.push(G.or(C)),d.sort(($,ie)=>$.compare(ie))),y=T.next}while(!R);P!==null&&(P.end=I.address.add(I.size),a[k]=P)}let f=Object.keys(a).map(y=>a[y]);f.sort((y,E)=>y.begin.compare(E.begin));let h=a[n.and(l).toString()];f.splice(f.indexOf(h),1),f.unshift(h);let u=new ThumbWriter(t,{pc:e}),m=!1,p=null,g=null;return f.forEach(y=>{let E=new ThumbRelocator(y.begin,u),O=y.begin,k=y.end,C=0;do{if(E.readOne()===0)throw new Error("Unexpected end of block");let I=E.input;O=I.address,C=I.size;let{mnemonic:R}=I,N=O.toString();c.has(N)&&u.putLabel(N);let T=!0;switch(R){case"b":u.putBLabel(we(I.operands[0])),T=!1;break;case"beq.w":u.putBCondLabelWide("eq",we(I.operands[0])),T=!1;break;case"bne.w":u.putBCondLabelWide("ne",we(I.operands[0])),T=!1;break;case"beq":case"bne":case"bgt":u.putBCondLabelWide(R.substr(1),we(I.operands[0])),T=!1;break;case"cbz":{let F=I.operands;u.putCbzRegLabel(F[0].value,we(F[1])),T=!1;break}case"cbnz":{let F=I.operands;u.putCbnzRegLabel(F[0].value,we(F[1])),T=!1;break}case"str":case"str.w":{let F=I.operands[1].value,v=F.disp;if(v===s){p=F.base;let U=p!=="r4"?"r4":"r5",V=["r0","r1","r2","r3",U,"r9","r12","lr"];u.putPushRegs(V),u.putMrsRegReg(U,"apsr-nzcvq"),u.putCallAddressWithArguments(i,[p]),u.putMsrRegReg("apsr-nzcvq",U),u.putPopRegs(V),m=!0,T=!1}else o.has(v)&&F.base===p&&(T=!1);break}case"ldr":{let[F,v]=I.operands;if(v.type==="mem"){let U=v.value;U.base[0]==="r"&&U.disp===qt&&(g=F.value)}break}case"blx":I.operands[0].value===g&&(u.putLdrRegRegOffset("r0","r0",4),u.putCallAddressWithArguments(i,["r0"]),m=!0,g=null,T=!1);break}T?E.writeAll():E.skipOne()}while(!O.add(C).equals(k));E.dispose()}),u.dispose(),m||yr(),new NativeFunction(e.or(1),"void",["pointer"],X)}function Yl(t,e,n,r,s,o,i){let a={},c=new Set,l=[n];for(;l.length>0;){let E=l.shift();if(Object.values(a).some(({begin:R,end:N})=>E.compare(R)>=0&&E.compare(N)<0))continue;let k=E.toString(),C={begin:E},P=null,I=!1;do{if(E.equals(r)){I=!0;break}let R;try{R=Instruction.parse(E)}catch(F){if(E.readU32()===0){I=!0;break}else throw F}P=R;let N=a[R.address.toString()];if(N!==void 0){delete a[N.begin.toString()],a[k]=N,N.begin=C.begin,C=null;break}let T=null;switch(R.mnemonic){case"b":T=ptr(R.operands[0].value),I=!0;break;case"b.eq":case"b.ne":case"b.le":case"b.gt":T=ptr(R.operands[0].value);break;case"cbz":case"cbnz":T=ptr(R.operands[1].value);break;case"tbz":case"tbnz":T=ptr(R.operands[2].value);break;case"ret":I=!0;break}T!==null&&(c.add(T.toString()),l.push(T),l.sort((F,v)=>F.compare(v))),E=R.next}while(!I);C!==null&&(C.end=P.address.add(P.size),a[k]=C)}let d=Object.keys(a).map(E=>a[E]);d.sort((E,O)=>E.begin.compare(O.begin));let f=a[n.toString()];d.splice(d.indexOf(f),1),d.unshift(f);let h=new Arm64Writer(t,{pc:e}),u=e.add(h.offset);h.putPushAllXRegisters(),h.putCallAddressWithArguments(i,["x0"]),h.putPopAllXRegisters(),h.putRet(),h.flush();let m=e.add(h.offset),p=!1,g=null,y=null;return d.forEach(E=>{let O=E.end.sub(E.begin).toInt32(),k=new Arm64Relocator(E.begin,h),C;for(;(C=k.readOne())!==0;){let P=k.input,{mnemonic:I}=P,R=P.address.toString();c.has(R)&&h.putLabel(R);let N=!0;switch(I){case"b":h.putBLabel(we(P.operands[0])),N=!1;break;case"b.eq":case"b.ne":case"b.le":case"b.gt":h.putBCondLabel(I.substr(2),we(P.operands[0])),N=!1;break;case"cbz":{let T=P.operands;h.putCbzRegLabel(T[0].value,we(T[1])),N=!1;break}case"cbnz":{let T=P.operands;h.putCbnzRegLabel(T[0].value,we(T[1])),N=!1;break}case"tbz":{let T=P.operands;h.putTbzRegImmLabel(T[0].value,T[1].value.valueOf(),we(T[2])),N=!1;break}case"tbnz":{let T=P.operands;h.putTbnzRegImmLabel(T[0].value,T[1].value.valueOf(),we(T[2])),N=!1;break}case"str":{let T=P.operands,F=T[0].value,v=T[1].value,U=v.disp;F==="xzr"&&U===s?(g=v.base,h.putPushRegReg("x0","lr"),h.putMovRegReg("x0",g),h.putBlImm(u),h.putPopRegReg("x0","lr"),p=!0,N=!1):o.has(U)&&v.base===g&&(N=!1);break}case"ldr":{let T=P.operands,F=T[1].value;F.base[0]==="x"&&F.disp===qt&&(y=T[0].value);break}case"blr":P.operands[0].value===y&&(h.putLdrRegRegOffset("x0","x0",8),h.putCallAddressWithArguments(i,["x0"]),p=!0,y=null,N=!1);break}if(N?k.writeAll():k.skipOne(),C===O)break}k.dispose()}),h.dispose(),p||yr(),new NativeFunction(m,"void",["pointer"],X)}function yr(){throw new Error("Unable to parse ART internals; please file a bug")}function Ql(t){let e=t["art::ArtMethod::PrettyMethod"];e!==void 0&&(Interceptor.attach(e.impl,fe.hooks.ArtMethod.prettyMethod),Interceptor.flush())}function we(t){return ptr(t.value).toString()}function Xl(t,e){return new NativeFunction(t,"pointer",e,X)}function ed(t,e){let n=new NativeFunction(t,"void",["pointer"].concat(e),X);return function(){let r=Memory.alloc(x);return n(r,...arguments),r.readPointer()}}function zt(t,e){let{arch:n}=Process;switch(n){case"ia32":case"arm64":{let r;n==="ia32"?r=nt(64,i=>{let a=1+e.length,c=a*4;i.putSubRegImm("esp",c);for(let l=0;l!==a;l++){let d=l*4;i.putMovRegRegOffsetPtr("eax","esp",c+4+d),i.putMovRegOffsetPtrReg("esp",d,"eax")}i.putCallAddress(t),i.putAddRegImm("esp",c-4),i.putRet()}):r=nt(32,i=>{i.putMovRegReg("x8","x0"),e.forEach((a,c)=>{i.putMovRegReg("x"+c,"x"+(c+1))}),i.putLdrRegAddress("x7",t),i.putBrReg("x7")});let s=new NativeFunction(r,"void",["pointer"].concat(e),X),o=function(...i){s(...i)};return o.handle=r,o.impl=t,o}default:{let r=new NativeFunction(t,"void",["pointer"].concat(e),X);return r.impl=t,r}}}var Ht=class{constructor(){this.handle=Memory.alloc(St)}dispose(){let[e,n]=this._getData();n||Z().$delete(e)}disposeToString(){let e=this.toString();return this.dispose(),e}toString(){let[e]=this._getData();return e.readUtf8String()}_getData(){let e=this.handle,n=(e.readU8()&1)===0;return[n?e.add(1):e.add(2*x).readPointer(),n]}},rr=class{$delete(){this.dispose(),Z().$delete(this)}constructor(e,n){this.handle=e,this._begin=e,this._end=e.add(x),this._storage=e.add(2*x),this._elementSize=n}init(){this.begin=NULL,this.end=NULL,this.storage=NULL}dispose(){Z().$delete(this.begin)}get begin(){return this._begin.readPointer()}set begin(e){this._begin.writePointer(e)}get end(){return this._end.readPointer()}set end(e){this._end.writePointer(e)}get storage(){return this._storage.readPointer()}set storage(e){this._storage.writePointer(e)}get size(){return this.end.sub(this.begin).toInt32()/this._elementSize}},vt=class t extends rr{static $new(){let e=new t(Z().$new(xc));return e.init(),e}constructor(e){super(e,x)}get handles(){let e=[],n=this.begin,r=this.end;for(;!n.equals(r);)e.push(n.readPointer()),n=n.add(x);return e}},td=0,Fs=x,Cs=Fs+4,nd=-1,Zt=class t{$delete(){this.dispose(),Z().$delete(this)}constructor(e){this.handle=e,this._link=e.add(td),this._numberOfReferences=e.add(Fs)}init(e,n){this.link=e,this.numberOfReferences=n}dispose(){}get link(){return new t(this._link.readPointer())}set link(e){this._link.writePointer(e)}get numberOfReferences(){return this._numberOfReferences.readS32()}set numberOfReferences(e){this._numberOfReferences.writeS32(e)}},Us=id(Cs),Ds=Us+x,rd=Ds+x,wt=class t extends Zt{static $new(e,n){let r=new t(Z().$new(rd));return r.init(e,n),r}constructor(e){super(e),this._self=e.add(Us),this._currentScope=e.add(Ds);let s=(64-x-4-4)/4;this._scopeLayout=Et.layoutForCapacity(s),this._topHandleScopePtr=null}init(e,n){let r=e.add(rt(n).offset.topHandleScope);this._topHandleScopePtr=r,super.init(r.readPointer(),nd),this.self=e,this.currentScope=Et.$new(this._scopeLayout),r.writePointer(this)}dispose(){this._topHandleScopePtr.writePointer(this.link);let e;for(;(e=this.currentScope)!==null;){let n=e.link;e.$delete(),this.currentScope=n}}get self(){return this._self.readPointer()}set self(e){this._self.writePointer(e)}get currentScope(){let e=this._currentScope.readPointer();return e.isNull()?null:new Et(e,this._scopeLayout)}set currentScope(e){this._currentScope.writePointer(e)}newHandle(e){return this.currentScope.newHandle(e)}},Et=class t extends Zt{static $new(e){let n=new t(Z().$new(e.size),e);return n.init(),n}constructor(e,n){super(e);let{offset:r}=n;this._refsStorage=e.add(r.refsStorage),this._pos=e.add(r.pos),this._layout=n}init(){super.init(NULL,this._layout.numberOfReferences),this.pos=0}get pos(){return this._pos.readU32()}set pos(e){this._pos.writeU32(e)}newHandle(e){let n=this.pos,r=this._refsStorage.add(n*4);return r.writeS32(e.toInt32()),this.pos=n+1,r}static layoutForCapacity(e){let n=Cs,r=n+e*4;return{size:r+4,numberOfReferences:e,offset:{refsStorage:n,pos:r}}}},sd={arm:function(t,e){let n=Process.pageSize,r=Memory.alloc(n);Memory.protect(r,n,"rwx");let s=new NativeCallback(e,"void",["pointer"]);r._onMatchCallback=s;let o=[26625,18947,17041,53505,19202,18200,18288,48896],i=o.length*2,a=i+4,c=a+4;return Memory.patchCode(r,c,function(l){o.forEach((d,f)=>{l.add(f*2).writeU16(d)}),l.add(i).writeS32(t),l.add(a).writePointer(s)}),r.or(1)},arm64:function(t,e){let n=Process.pageSize,r=Memory.alloc(n);Memory.protect(r,n,"rwx");let s=new NativeCallback(e,"void",["pointer"]);r._onMatchCallback=s;let o=[3107979265,402653378,1795293247,1409286241,1476395139,3592355936,3596551104],i=o.length*4,a=i+4,c=a+8;return Memory.patchCode(r,c,function(l){o.forEach((d,f)=>{l.add(f*4).writeU32(d)}),l.add(i).writeS32(t),l.add(a).writePointer(s)}),r}};function br(t,e){return(sd[Process.arch]||od)(t,e)}function od(t,e){return new NativeCallback(n=>{n.readS32()===t&&e(n)},"void",["pointer","pointer"])}function id(t){let e=t%x;return e!==0?t+x-e:t}var ad=4,{pointerSize:H}=Process,cd=256,ld=65536,dd=131072,ud=33554432,fd=67108864,hd=134217728,qe={exceptions:"propagate"},Bs=ye(Ad),pd=ye(Ld),md=ye(wd),Er=null,Sr=!1,Qt=new Map,xt=new Map;function Ie(){return Er===null&&(Er=_d()),Er}function _d(){let t=Process.enumerateModules().filter(c=>/jvm.(dll|dylib|so)$/.test(c.name));if(t.length===0)return null;let e=t[0],n={flavor:"jvm"},r=Process.platform==="windows"?[{module:e,functions:{JNI_GetCreatedJavaVMs:["JNI_GetCreatedJavaVMs","int",["pointer","int","pointer"]],JVM_Sleep:["JVM_Sleep","void",["pointer","pointer","long"]],"VMThread::execute":["VMThread::execute","void",["pointer"]],"Method::size":["Method::size","int",["int"]],"Method::set_native_function":["Method::set_native_function","void",["pointer","pointer","int"]],"Method::clear_native_function":["Method::clear_native_function","void",["pointer"]],"Method::jmethod_id":["Method::jmethod_id","pointer",["pointer"]],"ClassLoaderDataGraph::classes_do":["ClassLoaderDataGraph::classes_do","void",["pointer"]],"NMethodSweeper::sweep_code_cache":["NMethodSweeper::sweep_code_cache","void",[]],"OopMapCache::flush_obsolete_entries":["OopMapCache::flush_obsolete_entries","void",["pointer"]]},variables:{"VM_RedefineClasses::`vftable'":function(c){this.vtableRedefineClasses=c},"VM_RedefineClasses::doit":function(c){this.redefineClassesDoIt=c},"VM_RedefineClasses::doit_prologue":function(c){this.redefineClassesDoItPrologue=c},"VM_RedefineClasses::doit_epilogue":function(c){this.redefineClassesDoItEpilogue=c},"VM_RedefineClasses::allow_nested_vm_operations":function(c){this.redefineClassesAllow=c},"NMethodSweeper::_traversals":function(c){this.traversals=c},"NMethodSweeper::_should_sweep":function(c){this.shouldSweep=c}},optionals:[]}]:[{module:e,functions:{JNI_GetCreatedJavaVMs:["JNI_GetCreatedJavaVMs","int",["pointer","int","pointer"]],_ZN6Method4sizeEb:["Method::size","int",["int"]],_ZN6Method19set_native_functionEPhb:["Method::set_native_function","void",["pointer","pointer","int"]],_ZN6Method21clear_native_functionEv:["Method::clear_native_function","void",["pointer"]],_ZN6Method24restore_unshareable_infoEP10JavaThread:["Method::restore_unshareable_info","void",["pointer","pointer"]],_ZN6Method24restore_unshareable_infoEP6Thread:["Method::restore_unshareable_info","void",["pointer","pointer"]],_ZN6Method11link_methodERK12methodHandleP10JavaThread:["Method::link_method","void",["pointer","pointer","pointer"]],_ZN6Method10jmethod_idEv:["Method::jmethod_id","pointer",["pointer"]],_ZN6Method10clear_codeEv:function(c){let l=new NativeFunction(c,"void",["pointer"],qe);this["Method::clear_code"]=function(d){l(d)}},_ZN6Method10clear_codeEb:function(c){let l=new NativeFunction(c,"void",["pointer","int"],qe),d=0;this["Method::clear_code"]=function(f){l(f,d)}},_ZN18VM_RedefineClasses19mark_dependent_codeEP13InstanceKlass:["VM_RedefineClasses::mark_dependent_code","void",["pointer","pointer"]],_ZN18VM_RedefineClasses20flush_dependent_codeEv:["VM_RedefineClasses::flush_dependent_code","void",[]],_ZN18VM_RedefineClasses20flush_dependent_codeEP13InstanceKlassP6Thread:["VM_RedefineClasses::flush_dependent_code","void",["pointer","pointer","pointer"]],_ZN18VM_RedefineClasses20flush_dependent_codeE19instanceKlassHandleP6Thread:["VM_RedefineClasses::flush_dependent_code","void",["pointer","pointer","pointer"]],_ZN19ResolvedMethodTable21adjust_method_entriesEPb:["ResolvedMethodTable::adjust_method_entries","void",["pointer"]],_ZN15MemberNameTable21adjust_method_entriesEP13InstanceKlassPb:["MemberNameTable::adjust_method_entries","void",["pointer","pointer","pointer"]],_ZN17ConstantPoolCache21adjust_method_entriesEPb:function(c){let l=new NativeFunction(c,"void",["pointer","pointer"],qe);this["ConstantPoolCache::adjust_method_entries"]=function(d,f,h){l(d,h)}},_ZN17ConstantPoolCache21adjust_method_entriesEP13InstanceKlassPb:function(c){let l=new NativeFunction(c,"void",["pointer","pointer","pointer"],qe);this["ConstantPoolCache::adjust_method_entries"]=function(d,f,h){l(d,f,h)}},_ZN20ClassLoaderDataGraph10classes_doEP12KlassClosure:["ClassLoaderDataGraph::classes_do","void",["pointer"]],_ZN20ClassLoaderDataGraph22clean_deallocate_listsEb:["ClassLoaderDataGraph::clean_deallocate_lists","void",["int"]],_ZN10JavaThread27thread_from_jni_environmentEP7JNIEnv_:["JavaThread::thread_from_jni_environment","pointer",["pointer"]],_ZN8VMThread7executeEP12VM_Operation:["VMThread::execute","void",["pointer"]],_ZN11OopMapCache22flush_obsolete_entriesEv:["OopMapCache::flush_obsolete_entries","void",["pointer"]],_ZN14NMethodSweeper11force_sweepEv:["NMethodSweeper::force_sweep","void",[]],_ZN14NMethodSweeper16sweep_code_cacheEv:["NMethodSweeper::sweep_code_cache","void",[]],_ZN14NMethodSweeper17sweep_in_progressEv:["NMethodSweeper::sweep_in_progress","bool",[]],JVM_Sleep:["JVM_Sleep","void",["pointer","pointer","long"]]},variables:{_ZN18VM_RedefineClasses14_the_class_oopE:function(c){this.redefineClass=c},_ZN18VM_RedefineClasses10_the_classE:function(c){this.redefineClass=c},_ZN18VM_RedefineClasses25AdjustCpoolCacheAndVtable8do_klassEP5Klass:function(c){this.doKlass=c},_ZN18VM_RedefineClasses22AdjustAndCleanMetadata8do_klassEP5Klass:function(c){this.doKlass=c},_ZTV18VM_RedefineClasses:function(c){this.vtableRedefineClasses=c},_ZN18VM_RedefineClasses4doitEv:function(c){this.redefineClassesDoIt=c},_ZN18VM_RedefineClasses13doit_prologueEv:function(c){this.redefineClassesDoItPrologue=c},_ZN18VM_RedefineClasses13doit_epilogueEv:function(c){this.redefineClassesDoItEpilogue=c},_ZN18VM_RedefineClassesD0Ev:function(c){this.redefineClassesDispose0=c},_ZN18VM_RedefineClassesD1Ev:function(c){this.redefineClassesDispose1=c},_ZNK18VM_RedefineClasses26allow_nested_vm_operationsEv:function(c){this.redefineClassesAllow=c},_ZNK18VM_RedefineClasses14print_on_errorEP12outputStream:function(c){this.redefineClassesOnError=c},_ZN13InstanceKlass33create_new_default_vtable_indicesEiP10JavaThread:function(c){this.createNewDefaultVtableIndices=c},_ZN13InstanceKlass33create_new_default_vtable_indicesEiP6Thread:function(c){this.createNewDefaultVtableIndices=c},_ZN19Abstract_VM_Version19jre_release_versionEv:function(c){let d=new NativeFunction(c,"pointer",[],qe)().readCString();this.version=d.startsWith("1.8")?8:d.startsWith("9.")?9:parseInt(d.slice(0,2),10),this.versionS=d},_ZN14NMethodSweeper11_traversalsE:function(c){this.traversals=c},_ZN14NMethodSweeper21_sweep_fractions_leftE:function(c){this.fractions=c},_ZN14NMethodSweeper13_should_sweepE:function(c){this.shouldSweep=c}},optionals:["_ZN6Method24restore_unshareable_infoEP10JavaThread","_ZN6Method24restore_unshareable_infoEP6Thread","_ZN6Method11link_methodERK12methodHandleP10JavaThread","_ZN6Method10clear_codeEv","_ZN6Method10clear_codeEb","_ZN18VM_RedefineClasses19mark_dependent_codeEP13InstanceKlass","_ZN18VM_RedefineClasses20flush_dependent_codeEv","_ZN18VM_RedefineClasses20flush_dependent_codeEP13InstanceKlassP6Thread","_ZN18VM_RedefineClasses20flush_dependent_codeE19instanceKlassHandleP6Thread","_ZN19ResolvedMethodTable21adjust_method_entriesEPb","_ZN15MemberNameTable21adjust_method_entriesEP13InstanceKlassPb","_ZN17ConstantPoolCache21adjust_method_entriesEPb","_ZN17ConstantPoolCache21adjust_method_entriesEP13InstanceKlassPb","_ZN20ClassLoaderDataGraph22clean_deallocate_listsEb","_ZN10JavaThread27thread_from_jni_environmentEP7JNIEnv_","_ZN14NMethodSweeper11force_sweepEv","_ZN14NMethodSweeper17sweep_in_progressEv","_ZN18VM_RedefineClasses14_the_class_oopE","_ZN18VM_RedefineClasses10_the_classE","_ZN18VM_RedefineClasses25AdjustCpoolCacheAndVtable8do_klassEP5Klass","_ZN18VM_RedefineClasses22AdjustAndCleanMetadata8do_klassEP5Klass","_ZN18VM_RedefineClassesD0Ev","_ZN18VM_RedefineClassesD1Ev","_ZNK18VM_RedefineClasses14print_on_errorEP12outputStream","_ZN13InstanceKlass33create_new_default_vtable_indicesEiP10JavaThread","_ZN13InstanceKlass33create_new_default_vtable_indicesEiP6Thread","_ZN14NMethodSweeper21_sweep_fractions_leftE"]}],s=[];if(r.forEach(function(c){let l=c.module,d=c.functions||{},f=c.variables||{},h=new Set(c.optionals||[]),u=l.enumerateExports().reduce(function(p,g){return p[g.name]=g,p},{}),m=l.enumerateSymbols().reduce(function(p,g){return p[g.name]=g,p},u);Object.keys(d).forEach(function(p){let g=m[p];if(g!==void 0){let y=d[p];typeof y=="function"?y.call(n,g.address):n[y[0]]=new NativeFunction(g.address,y[1],y[2],qe)}else h.has(p)||s.push(p)}),Object.keys(f).forEach(function(p){let g=m[p];g!==void 0?f[p].call(n,g.address):h.has(p)||s.push(p)})}),s.length>0)throw new Error("Java API only partially available; please file a bug. Missing: "+s.join(", "));let o=Memory.alloc(H),i=Memory.alloc(ad);if(be("JNI_GetCreatedJavaVMs",n.JNI_GetCreatedJavaVMs(o,1,i)),i.readInt()===0)return null;n.vm=o.readPointer();let a=Process.platform==="windows"?{$new:["??2@YAPEAX_K@Z","pointer",["ulong"]],$delete:["??3@YAXPEAX@Z","void",["pointer"]]}:{$new:["_Znwm","pointer",["ulong"]],$delete:["_ZdlPv","void",["pointer"]]};for(let[c,[l,d,f]]of Object.entries(a)){let h=Module.findGlobalExportByName(l);if(h===null&&(h=DebugSymbol.fromName(l).address,h.isNull()))throw new Error(`unable to find C++ allocator API, missing: '${l}'`);n[c]=new NativeFunction(h,d,f,qe)}return n.jvmti=gd(n),n["JavaThread::thread_from_jni_environment"]===void 0&&(n["JavaThread::thread_from_jni_environment"]=bd(n)),n}function gd(t){let e=new Pe(t),n;return e.perform(()=>{let r=e.tryGetEnvHandle(Rt.v1_0);if(r===null)throw new Error("JVMTI not available");n=new Ue(r,e);let s=Memory.alloc(8);s.writeU64(Pt.canTagObjects);let o=n.addCapabilities(s);be("getEnvJvmti::AddCapabilities",o)}),n}var yd={x64:Ed};function bd(t){let e=null,n=yd[Process.arch];if(n!==void 0){let s=new Pe(t).perform(o=>o.handle.readPointer().add(6*H).readPointer());e=De(s,n,{limit:11})}return e===null?()=>{throw new Error("Unable to make thread_from_jni_environment() helper for the current architecture")}:r=>r.add(e)}function Ed(t){if(t.mnemonic!=="lea")return null;let{base:e,disp:n}=t.operands[1].value;return e==="rdi"&&n<0?n:null}function $s(t,e){}var vr=class{constructor(e){this.methodId=e,this.method=e.readPointer(),this.originalMethod=null,this.newMethod=null,this.resolved=null,this.impl=null,this.key=e.toString(16)}replace(e,n,r,s,o){let{key:i}=this,a=xt.get(i);a!==void 0&&(xt.delete(i),this.method=a.method,this.originalMethod=a.originalMethod,this.newMethod=a.newMethod,this.resolved=a.resolved),this.impl=e,Qt.set(i,this),zs(s)}revert(e){let{key:n}=this;Qt.delete(n),xt.set(n,this),zs(e)}resolveTarget(e,n,r,s){let{resolved:o,originalMethod:i,methodId:a}=this;if(o!==null)return o;if(i===null)return a;i.oldMethod.vtableIndexPtr.writeS32(-2);let l=Memory.alloc(H);return l.writePointer(this.method),this.resolved=l,l}};function zs(t){Sr||(Sr=!0,Script.nextTick(Sd,t))}function Sd(t){let e=new Map(Qt),n=new Map(xt);Qt.clear(),xt.clear(),Sr=!1,t.perform(r=>{let s=Ie(),o=s["JavaThread::thread_from_jni_environment"](r.handle),i=!1;Js(()=>{e.forEach(a=>{let{method:c,originalMethod:l,impl:d,methodId:f,newMethod:h}=a;l===null?(a.originalMethod=Zs(c),a.newMethod=Td(c,d,o),Gs(a.newMethod,f,o)):s["Method::set_native_function"](h.method,d,0)}),n.forEach(a=>{let{originalMethod:c,methodId:l,newMethod:d}=a;if(c!==null){xd(c);let f=c.oldMethod;f.oldMethod=d,Gs(f,l,o),i=!0}})}),i&&vd(r.handle)})}function vd(t){let{fractions:e,shouldSweep:n,traversals:r,"NMethodSweeper::sweep_code_cache":s,"NMethodSweeper::sweep_in_progress":o,"NMethodSweeper::force_sweep":i,JVM_Sleep:a}=Ie();if(i!==void 0)Thread.sleep(.05),i(),Thread.sleep(.05),i();else{let c=r.readS64(),l=c+2;for(;l>c;)e.writeS32(1),a(t,NULL,50),o()||Js(()=>{Thread.sleep(.05)}),n.readU8()===0&&(e.writeS32(1),s()),c=r.readS64()}}function Js(t,e,n){let{execute:r,vtable:s,vtableSize:o,doItOffset:i,prologueOffset:a,epilogueOffset:c}=md(),l=Memory.dup(s,o),d=Memory.alloc(H*25);d.writePointer(l);let f=new NativeCallback(t,"void",["pointer"]);l.add(i).writePointer(f);let h=null;e!==void 0&&(h=new NativeCallback(e,"int",["pointer"]),l.add(a).writePointer(h));let u=null;n!==void 0&&(u=new NativeCallback(n,"void",["pointer"]),l.add(c).writePointer(u)),r(d)}function wd(){let{vtableRedefineClasses:t,redefineClassesDoIt:e,redefineClassesDoItPrologue:n,redefineClassesDoItEpilogue:r,redefineClassesOnError:s,redefineClassesAllow:o,redefineClassesDispose0:i,redefineClassesDispose1:a,"VMThread::execute":c}=Ie(),l=t.add(2*H),d=15*H,f=Memory.dup(l,d),h=new NativeCallback(()=>{},"void",["pointer"]),u,m,p;for(let g=0;g!==d;g+=H){let y=f.add(g),E=y.readPointer();s!==void 0&&E.equals(s)||i!==void 0&&E.equals(i)||a!==void 0&&E.equals(a)?y.writePointer(h):E.equals(e)?u=g:E.equals(n)?(m=g,y.writePointer(o)):E.equals(r)&&(p=g,y.writePointer(h))}return{execute:c,emptyCallback:h,vtable:f,vtableSize:d,doItOffset:u,prologueOffset:m,epilogueOffset:p}}function Hs(t){return new vr(t)}function Gs(t,e,n){let{method:r,oldMethod:s}=t,o=Ie();t.methodsArray.add(t.methodIndex*H).writePointer(r),t.vtableIndex>=0&&t.vtable.add(t.vtableIndex*H).writePointer(r),e.writePointer(r),s.accessFlagsPtr.writeU32((s.accessFlags|ld|dd)>>>0);let i=o["OopMapCache::flush_obsolete_entries"];if(i!==void 0){let{oopMapCache:m}=t;m.isNull()||i(m)}let a=o["VM_RedefineClasses::mark_dependent_code"],c=o["VM_RedefineClasses::flush_dependent_code"];a!==void 0?(a(NULL,t.instanceKlass),c()):c(NULL,t.instanceKlass,n);let l=Memory.alloc(1);l.writeU8(1),o["ConstantPoolCache::adjust_method_entries"](t.cache,t.instanceKlass,l);let d=Memory.alloc(3*H),f=Memory.alloc(H);f.writePointer(o.doKlass),d.writePointer(f),d.add(H).writePointer(n),d.add(2*H).writePointer(n),o.redefineClass!==void 0&&o.redefineClass.writePointer(t.instanceKlass),o["ClassLoaderDataGraph::classes_do"](d);let h=o["ResolvedMethodTable::adjust_method_entries"];if(h!==void 0)h(l);else{let{memberNames:m}=t;if(!m.isNull()){let p=o["MemberNameTable::adjust_method_entries"];p!==void 0&&p(m,t.instanceKlass,l)}}let u=o["ClassLoaderDataGraph::clean_deallocate_lists"];u!==void 0&&u(0)}function Td(t,e,n){let r=Ie(),s=Zs(t);s.constPtr.writePointer(s.const);let o=(s.accessFlags|cd|ud|fd|hd)>>>0;if(s.accessFlagsPtr.writeU32(o),s.signatureHandler.writePointer(NULL),s.adapter.writePointer(NULL),s.i2iEntry.writePointer(NULL),r["Method::clear_code"](s.method),s.dataPtr.writePointer(NULL),s.countersPtr.writePointer(NULL),s.stackmapPtr.writePointer(NULL),r["Method::clear_native_function"](s.method),r["Method::set_native_function"](s.method,e,0),r["Method::restore_unshareable_info"](s.method,n),r.version>=17){let i=Memory.alloc(2*H);i.writePointer(s.method),i.add(H).writePointer(n),r["Method::link_method"](s.method,i,n)}return s}function Zs(t){let e=Bs(),n=t.add(e.method.constMethodOffset).readPointer(),r=n.add(e.constMethod.sizeOffset).readS32()*H,s=Memory.alloc(r+e.method.size);Memory.copy(s,n,r);let o=s.add(r);Memory.copy(o,t,e.method.size);let i=Vs(o,s,r),a=Vs(t,n,r);return i.oldMethod=a,i}function Vs(t,e,n){let r=Ie(),s=Bs(),o=t.add(s.method.constMethodOffset),i=t.add(s.method.methodDataOffset),a=t.add(s.method.methodCountersOffset),c=t.add(s.method.accessFlagsOffset),l=c.readU32(),d=s.getAdapterPointer(t,e),f=t.add(s.method.i2iEntryOffset),h=t.add(s.method.signatureHandlerOffset),u=e.add(s.constMethod.constantPoolOffset).readPointer(),m=e.add(s.constMethod.stackmapDataOffset),p=u.add(s.constantPool.instanceKlassOffset).readPointer(),g=u.add(s.constantPool.cacheOffset).readPointer(),y=pd(),E=p.add(y.methodsOffset).readPointer(),O=E.readS32(),k=E.add(H),C=e.add(s.constMethod.methodIdnumOffset).readU16(),P=t.add(s.method.vtableIndexOffset),I=P.readS32(),R=p.add(y.vtableOffset),N=p.add(y.oopMapCacheOffset).readPointer(),T=r.version>=10?p.add(y.memberNamesOffset).readPointer():NULL;return{method:t,methodSize:s.method.size,const:e,constSize:n,constPtr:o,dataPtr:i,countersPtr:a,stackmapPtr:m,instanceKlass:p,methodsArray:k,methodsCount:O,methodIndex:C,vtableIndex:I,vtableIndexPtr:P,vtable:R,accessFlags:l,accessFlagsPtr:c,adapter:d,i2iEntry:f,signatureHandler:h,memberNames:T,cache:g,oopMapCache:N}}function xd(t){let{oldMethod:e}=t;e.accessFlagsPtr.writeU32(e.accessFlags),e.vtableIndexPtr.writeS32(e.vtableIndex)}function Ad(){let t=Ie(),{version:e}=t,n;e>=17?n="method:early":e>=9&&e<=16?n="const-method":n="method:late";let s=t["Method::size"](1)*H,o=H,i=2*H,a=3*H,c=4*H,l=n==="method:early"?H:0,d=c+l,f=d+4,h=f+4+8,u=h+H,m=l!==0?c:u,p=s-2*H,g=s-H,y=8,E=y+H,O=E+H,k=n==="const-method"?H:0,C=O+k,P=C+14,I=2*H,R=3*H;return{getAdapterPointer:k!==0?function(T,F){return F.add(O)}:function(T,F){return T.add(m)},method:{size:s,constMethodOffset:o,methodDataOffset:i,methodCountersOffset:a,accessFlagsOffset:d,vtableIndexOffset:f,i2iEntryOffset:h,nativeFunctionOffset:p,signatureHandlerOffset:g},constMethod:{constantPoolOffset:y,stackmapDataOffset:E,sizeOffset:C,methodIdnumOffset:P},constantPool:{cacheOffset:I,instanceKlassOffset:R}}}var Nd={x64:Md};function Ld(){let{version:t,createNewDefaultVtableIndices:e}=Ie(),n=Nd[Process.arch];if(n===void 0)throw new Error(`Missing vtable offset parser for ${Process.arch}`);let r=De(e,n,{limit:32});if(r===null)throw new Error("Unable to deduce vtable offset");let s=t>=10&&t<=11||t>=15?17:18,o=r-7*H,i=r-17*H,a=r-s*H;return{vtableOffset:r,methodsOffset:o,memberNamesOffset:i,oopMapCacheOffset:a}}function Md(t){if(t.mnemonic!=="mov")return null;let e=t.operands[0];if(e.type!=="mem")return null;let{value:n}=e;if(n.scale!==1)return null;let{disp:r}=n;return r<256?null:r+16}var qs=Z;try{Tt()}catch{qs=Ie}var At=qs;function kd(){try{let t=new NativeFunction(Process.getModuleByName("libc.so").getExportByName("__system_property_get"),"int",["pointer","pointer"]),e=Memory.alloc(92);return t(Memory.allocUtf8String("ro.build.version.sdk"),e),parseInt(e.readUtf8String()||"0",10)}catch{return 0}}var jd=`#include <json-glib/json-glib.h>
#include <string.h>

#define kAccStatic 0x0008
#define kAccConstructor 0x00010000

typedef struct _Model Model;
typedef struct _EnumerateMethodsContext EnumerateMethodsContext;

typedef struct _JavaApi JavaApi;
typedef struct _JavaClassApi JavaClassApi;
typedef struct _JavaMethodApi JavaMethodApi;
typedef struct _JavaFieldApi JavaFieldApi;

typedef struct _JNIEnv JNIEnv;
typedef guint8 jboolean;
typedef gint32 jint;
typedef jint jsize;
typedef gpointer jobject;
typedef jobject jclass;
typedef jobject jstring;
typedef jobject jarray;
typedef jarray jobjectArray;
typedef gpointer jfieldID;
typedef gpointer jmethodID;

typedef struct _jvmtiEnv jvmtiEnv;
typedef enum
{
  JVMTI_ERROR_NONE = 0
} jvmtiError;

typedef struct _ArtApi ArtApi;
typedef guint32 ArtHeapReference;
typedef struct _ArtObject ArtObject;
typedef struct _ArtClass ArtClass;
typedef struct _ArtClassLinker ArtClassLinker;
typedef struct _ArtClassVisitor ArtClassVisitor;
typedef struct _ArtClassVisitorVTable ArtClassVisitorVTable;
typedef struct _ArtMethod ArtMethod;
typedef struct _ArtString ArtString;

typedef union _StdString StdString;
typedef struct _StdStringShort StdStringShort;
typedef struct _StdStringLong StdStringLong;

typedef void (* ArtVisitClassesFunc) (ArtClassLinker * linker, ArtClassVisitor * visitor);
typedef const char * (* ArtGetClassDescriptorFunc) (ArtClass * klass, StdString * storage);
typedef void (* ArtPrettyMethodFunc) (StdString * result, ArtMethod * method, jboolean with_signature);

struct _Model
{
  GHashTable * members;
};

struct _EnumerateMethodsContext
{
  GPatternSpec * class_query;
  GPatternSpec * method_query;
  jboolean include_signature;
  jboolean ignore_case;
  jboolean skip_system_classes;
  GHashTable * groups;
};

struct _JavaClassApi
{
  jmethodID get_declared_methods;
  jmethodID get_declared_fields;
};

struct _JavaMethodApi
{
  jmethodID get_name;
  jmethodID get_modifiers;
};

struct _JavaFieldApi
{
  jmethodID get_name;
  jmethodID get_modifiers;
};

struct _JavaApi
{
  jvmtiEnv * jvmti;
  JavaClassApi clazz;
  JavaMethodApi method;
  JavaFieldApi field;
};

struct _JNIEnv
{
  gpointer * functions;
};

struct _jvmtiEnv
{
  gpointer * functions;
};

struct _ArtApi
{
  gboolean available;

  guint class_offset_ifields;
  guint class_offset_methods;
  guint class_offset_sfields;
  guint class_offset_copied_methods_offset;

  guint method_size;
  guint method_offset_access_flags;

  guint field_size;
  guint field_offset_access_flags;

  guint alignment_padding;

  ArtClassLinker * linker;
  ArtVisitClassesFunc visit_classes;
  ArtGetClassDescriptorFunc get_class_descriptor;
  ArtPrettyMethodFunc pretty_method;

  void (* free) (gpointer mem);
};

struct _ArtObject
{
  ArtHeapReference klass;
  ArtHeapReference monitor;
};

struct _ArtClass
{
  ArtObject parent;

  ArtHeapReference class_loader;
};

struct _ArtClassVisitor
{
  ArtClassVisitorVTable * vtable;
  gpointer user_data;
};

struct _ArtClassVisitorVTable
{
  void (* reserved1) (ArtClassVisitor * self);
  void (* reserved2) (ArtClassVisitor * self);
  jboolean (* visit) (ArtClassVisitor * self, ArtClass * klass);
};

struct _ArtString
{
  ArtObject parent;

  gint32 count;
  guint32 hash_code;

  union
  {
    guint16 value[0];
    guint8 value_compressed[0];
  };
};

struct _StdStringShort
{
  guint8 size;
  gchar data[(3 * sizeof (gpointer)) - sizeof (guint8)];
};

struct _StdStringLong
{
  gsize capacity;
  gsize size;
  gchar * data;
};

union _StdString
{
  StdStringShort s;
  StdStringLong l;
};

static void model_add_method (Model * self, const gchar * name, jmethodID id, jint modifiers);
static void model_add_field (Model * self, const gchar * name, jfieldID id, jint modifiers);
static void model_free (Model * model);

static jboolean collect_matching_class_methods (ArtClassVisitor * self, ArtClass * klass);
static gchar * finalize_method_groups_to_json (GHashTable * groups);
static GPatternSpec * make_pattern_spec (const gchar * pattern, jboolean ignore_case);
static gchar * class_name_from_signature (const gchar * signature);
static gchar * format_method_signature (const gchar * name, const gchar * signature);
static void append_type (GString * output, const gchar ** type);

static gpointer read_art_array (gpointer object_base, guint field_offset, guint length_size, guint * length);

static void std_string_destroy (StdString * str);
static gchar * std_string_c_str (StdString * self);

extern GMutex lock;
extern GArray * models;
extern JavaApi java_api;
extern ArtApi art_api;

void
init (void)
{
  g_mutex_init (&lock);
  models = g_array_new (FALSE, FALSE, sizeof (Model *));
}

void
finalize (void)
{
  guint n, i;

  n = models->len;
  for (i = 0; i != n; i++)
  {
    Model * model = g_array_index (models, Model *, i);
    model_free (model);
  }

  g_array_unref (models);
  g_mutex_clear (&lock);
}

Model *
model_new (jclass class_handle,
           gpointer class_object,
           JNIEnv * env)
{
  Model * model;
  GHashTable * members;
  jvmtiEnv * jvmti = java_api.jvmti;
  gpointer * funcs = env->functions;
  jmethodID (* from_reflected_method) (JNIEnv *, jobject) = funcs[7];
  jfieldID (* from_reflected_field) (JNIEnv *, jobject) = funcs[8];
  jobject (* to_reflected_method) (JNIEnv *, jclass, jmethodID, jboolean) = funcs[9];
  jobject (* to_reflected_field) (JNIEnv *, jclass, jfieldID, jboolean) = funcs[12];
  jobject (* exception_occurred) (JNIEnv *) = funcs[15];
  void (* exception_clear) (JNIEnv *) = funcs[17];
  void (* delete_local_ref) (JNIEnv *, jobject) = funcs[23];
  jobject (* call_object_method) (JNIEnv *, jobject, jmethodID, ...) = funcs[34];
  jint (* call_int_method) (JNIEnv *, jobject, jmethodID, ...) = funcs[49];
  const char * (* get_string_utf_chars) (JNIEnv *, jstring, jboolean *) = funcs[169];
  void (* release_string_utf_chars) (JNIEnv *, jstring, const char *) = funcs[170];
  jsize (* get_array_length) (JNIEnv *, jarray) = funcs[171];
  jobject (* get_object_array_element) (JNIEnv *, jobjectArray, jsize) = funcs[173];
  jsize n, i;

  model = g_new (Model, 1);

  members = g_hash_table_new_full (g_str_hash, g_str_equal, g_free, g_free);
  model->members = members;

  if (jvmti != NULL)
  {
    gpointer * jf = jvmti->functions - 1;
    jvmtiError (* deallocate) (jvmtiEnv *, void * mem) = jf[47];
    jvmtiError (* get_class_methods) (jvmtiEnv *, jclass, jint *, jmethodID **) = jf[52];
    jvmtiError (* get_class_fields) (jvmtiEnv *, jclass, jint *, jfieldID **) = jf[53];
    jvmtiError (* get_field_name) (jvmtiEnv *, jclass, jfieldID, char **, char **, char **) = jf[60];
    jvmtiError (* get_field_modifiers) (jvmtiEnv *, jclass, jfieldID, jint *) = jf[62];
    jvmtiError (* get_method_name) (jvmtiEnv *, jmethodID, char **, char **, char **) = jf[64];
    jvmtiError (* get_method_modifiers) (jvmtiEnv *, jmethodID, jint *) = jf[66];
    jint method_count;
    jmethodID * methods;
    jint field_count;
    jfieldID * fields;
    char * name;
    jint modifiers;

    get_class_methods (jvmti, class_handle, &method_count, &methods);
    for (i = 0; i != method_count; i++)
    {
      jmethodID method = methods[i];

      get_method_name (jvmti, method, &name, NULL, NULL);
      get_method_modifiers (jvmti, method, &modifiers);

      model_add_method (model, name, method, modifiers);

      deallocate (jvmti, name);
    }
    deallocate (jvmti, methods);

    get_class_fields (jvmti, class_handle, &field_count, &fields);
    for (i = 0; i != field_count; i++)
    {
      jfieldID field = fields[i];

      get_field_name (jvmti, class_handle, field, &name, NULL, NULL);
      get_field_modifiers (jvmti, class_handle, field, &modifiers);

      model_add_field (model, name, field, modifiers);

      deallocate (jvmti, name);
    }
    deallocate (jvmti, fields);
  }
  else if (art_api.available)
  {
    gpointer elements;
    guint n, i;
    const guint field_arrays[] = {
      art_api.class_offset_ifields,
      art_api.class_offset_sfields
    };
    guint field_array_cursor;
    gboolean merged_fields = art_api.class_offset_sfields == 0;

    elements = read_art_array (class_object, art_api.class_offset_methods, sizeof (gsize), NULL);
    n = *(guint16 *) (class_object + art_api.class_offset_copied_methods_offset);
    for (i = 0; i != n; i++)
    {
      jmethodID id;
      guint32 access_flags;
      jboolean is_static;
      jobject method, name;
      const char * name_str;
      jint modifiers;

      id = elements + (i * art_api.method_size);

      access_flags = *(guint32 *) (id + art_api.method_offset_access_flags);
      if ((access_flags & kAccConstructor) != 0)
        continue;
      is_static = (access_flags & kAccStatic) != 0;
      method = to_reflected_method (env, class_handle, id, is_static);
      name = call_object_method (env, method, java_api.method.get_name);
      name_str = get_string_utf_chars (env, name, NULL);
      modifiers = access_flags & 0xffff;

      model_add_method (model, name_str, id, modifiers);

      release_string_utf_chars (env, name, name_str);
      delete_local_ref (env, name);
      delete_local_ref (env, method);
    }

    for (field_array_cursor = 0; field_array_cursor != G_N_ELEMENTS (field_arrays); field_array_cursor++)
    {
      jboolean is_static;

      if (field_arrays[field_array_cursor] == 0)
        continue;

      if (!merged_fields)
        is_static = field_array_cursor == 1;

      elements = read_art_array (class_object, field_arrays[field_array_cursor], sizeof (guint32), &n);
      for (i = 0; i != n; i++)
      {
        jfieldID id;
        guint32 access_flags;
        jobject field, name;
        const char * name_str;
        jint modifiers;

        id = elements + (i * art_api.field_size);

        access_flags = *(guint32 *) (id + art_api.field_offset_access_flags);
        if (merged_fields)
          is_static = (access_flags & kAccStatic) != 0;
        field = to_reflected_field (env, class_handle, id, is_static);
        name = call_object_method (env, field, java_api.field.get_name);
        name_str = get_string_utf_chars (env, name, NULL);
        modifiers = access_flags & 0xffff;

        model_add_field (model, name_str, id, modifiers);

        release_string_utf_chars (env, name, name_str);
        delete_local_ref (env, name);
        delete_local_ref (env, field);
      }
    }
  }
  else
  {
    jobject elements;

    jobject ex;
    elements = call_object_method (env, class_handle, java_api.clazz.get_declared_methods);
    ex = exception_occurred (env);
    if (ex != NULL) { exception_clear (env); delete_local_ref (env, ex); elements = NULL; }
    if (elements != NULL) {
      n = get_array_length (env, elements);
    for (i = 0; i != n; i++)
    {
      jobject method, name;
      const char * name_str;
      jmethodID id;
      jint modifiers;

      method = get_object_array_element (env, elements, i);
      name = call_object_method (env, method, java_api.method.get_name);
      name_str = get_string_utf_chars (env, name, NULL);
      id = from_reflected_method (env, method);
      modifiers = call_int_method (env, method, java_api.method.get_modifiers);

      model_add_method (model, name_str, id, modifiers);

      release_string_utf_chars (env, name, name_str);
      delete_local_ref (env, name);
      delete_local_ref (env, method);
    }
    delete_local_ref (env, elements);

    delete_local_ref (env, elements);
    }
    elements = call_object_method (env, class_handle, java_api.clazz.get_declared_fields);
    ex = exception_occurred (env);
    if (ex != NULL) { exception_clear (env); delete_local_ref (env, ex); elements = NULL; }
    if (elements != NULL) {
      n = get_array_length (env, elements);
    for (i = 0; i != n; i++)
    {
      jobject field, name;
      const char * name_str;
      jfieldID id;
      jint modifiers;

      field = get_object_array_element (env, elements, i);
      name = call_object_method (env, field, java_api.field.get_name);
      name_str = get_string_utf_chars (env, name, NULL);
      id = from_reflected_field (env, field);
      modifiers = call_int_method (env, field, java_api.field.get_modifiers);

      model_add_field (model, name_str, id, modifiers);

      release_string_utf_chars (env, name, name_str);
      delete_local_ref (env, name);
      delete_local_ref (env, field);
    }
    delete_local_ref (env, elements);
    }
  }

  g_mutex_lock (&lock);
  g_array_append_val (models, model);
  g_mutex_unlock (&lock);

  return model;
}

static void
model_add_method (Model * self,
                  const gchar * name,
                  jmethodID id,
                  jint modifiers)
{
  GHashTable * members = self->members;
  gchar * key, type;
  const gchar * value;

  if (name[0] == '$')
    key = g_strdup_printf ("_%s", name);
  else
    key = g_strdup (name);

  type = (modifiers & kAccStatic) != 0 ? 's' : 'i';

  value = g_hash_table_lookup (members, key);
  if (value == NULL)
    g_hash_table_insert (members, key, g_strdup_printf ("m:%c0x%zx", type, id));
  else
    g_hash_table_insert (members, key, g_strdup_printf ("%s:%c0x%zx", value, type, id));
}

static void
model_add_field (Model * self,
                 const gchar * name,
                 jfieldID id,
                 jint modifiers)
{
  GHashTable * members = self->members;
  gchar * key, type;

  if (name[0] == '$')
    key = g_strdup_printf ("_%s", name);
  else
    key = g_strdup (name);
  while (g_hash_table_contains (members, key))
  {
    gchar * new_key = g_strdup_printf ("_%s", key);
    g_free (key);
    key = new_key;
  }

  type = (modifiers & kAccStatic) != 0 ? 's' : 'i';

  g_hash_table_insert (members, key, g_strdup_printf ("f:%c0x%zx", type, id));
}

static void
model_free (Model * model)
{
  g_hash_table_unref (model->members);

  g_free (model);
}

gboolean
model_has (Model * self,
           const gchar * member)
{
  return g_hash_table_contains (self->members, member);
}

const gchar *
model_find (Model * self,
            const gchar * member)
{
  return g_hash_table_lookup (self->members, member);
}

gchar *
model_list (Model * self)
{
  GString * result;
  GHashTableIter iter;
  guint i;
  const gchar * name;

  result = g_string_sized_new (128);

  g_string_append_c (result, '[');

  g_hash_table_iter_init (&iter, self->members);
  for (i = 0; g_hash_table_iter_next (&iter, (gpointer *) &name, NULL); i++)
  {
    if (i > 0)
      g_string_append_c (result, ',');

    g_string_append_c (result, '"');
    g_string_append (result, name);
    g_string_append_c (result, '"');
  }

  g_string_append_c (result, ']');

  return g_string_free (result, FALSE);
}

gchar *
enumerate_methods_art (const gchar * class_query,
                       const gchar * method_query,
                       jboolean include_signature,
                       jboolean ignore_case,
                       jboolean skip_system_classes)
{
  gchar * result;
  EnumerateMethodsContext ctx;
  ArtClassVisitor visitor;
  ArtClassVisitorVTable visitor_vtable = { NULL, };

  ctx.class_query = make_pattern_spec (class_query, ignore_case);
  ctx.method_query = make_pattern_spec (method_query, ignore_case);
  ctx.include_signature = include_signature;
  ctx.ignore_case = ignore_case;
  ctx.skip_system_classes = skip_system_classes;
  ctx.groups = g_hash_table_new_full (NULL, NULL, NULL, NULL);

  visitor.vtable = &visitor_vtable;
  visitor.user_data = &ctx;

  visitor_vtable.visit = collect_matching_class_methods;

  art_api.visit_classes (art_api.linker, &visitor);

  result = finalize_method_groups_to_json (ctx.groups);

  g_hash_table_unref (ctx.groups);
  g_pattern_spec_free (ctx.method_query);
  g_pattern_spec_free (ctx.class_query);

  return result;
}

static jboolean
collect_matching_class_methods (ArtClassVisitor * self,
                                ArtClass * klass)
{
  EnumerateMethodsContext * ctx = self->user_data;
  const char * descriptor;
  StdString descriptor_storage = { 0, };
  gchar * class_name = NULL;
  gchar * class_name_copy = NULL;
  const gchar * normalized_class_name;
  JsonBuilder * group;
  size_t class_name_length;
  GHashTable * seen_method_names;
  gpointer elements;
  guint n, i;

  if (ctx->skip_system_classes && klass->class_loader == 0)
    goto skip_class;

  descriptor = art_api.get_class_descriptor (klass, &descriptor_storage);
  if (descriptor[0] != 'L')
    goto skip_class;

  class_name = class_name_from_signature (descriptor);

  if (ctx->ignore_case)
  {
    class_name_copy = g_utf8_strdown (class_name, -1);
    normalized_class_name = class_name_copy;
  }
  else
  {
    normalized_class_name = class_name;
  }

  if (!g_pattern_match_string (ctx->class_query, normalized_class_name))
    goto skip_class;

  group = NULL;
  class_name_length = strlen (class_name);
  seen_method_names = ctx->include_signature ? NULL : g_hash_table_new_full (g_str_hash, g_str_equal, g_free, NULL);

  elements = read_art_array (klass, art_api.class_offset_methods, sizeof (gsize), NULL);
  n = *(guint16 *) ((gpointer) klass + art_api.class_offset_copied_methods_offset);
  for (i = 0; i != n; i++)
  {
    ArtMethod * method;
    guint32 access_flags;
    jboolean is_constructor;
    StdString method_name = { 0, };
    const gchar * bare_method_name;
    gchar * bare_method_name_copy = NULL;
    const gchar * normalized_method_name;
    gchar * normalized_method_name_copy = NULL;

    method = elements + (i * art_api.method_size);

    access_flags = *(guint32 *) ((gpointer) method + art_api.method_offset_access_flags);
    is_constructor = (access_flags & kAccConstructor) != 0;

    art_api.pretty_method (&method_name, method, ctx->include_signature);
    bare_method_name = std_string_c_str (&method_name);
    if (ctx->include_signature)
    {
      const gchar * return_type_end, * name_begin;
      GString * name;

      return_type_end = strchr (bare_method_name, ' ');
      name_begin = return_type_end + 1 + class_name_length + 1;
      if (is_constructor && g_str_has_prefix (name_begin, "<clinit>"))
        goto skip_method;

      name = g_string_sized_new (64);

      if (is_constructor)
      {
        g_string_append (name, "$init");
        g_string_append (name, strchr (name_begin, '>') + 1);
      }
      else
      {
        g_string_append (name, name_begin);
      }
      g_string_append (name, ": ");
      g_string_append_len (name, bare_method_name, return_type_end - bare_method_name);

      bare_method_name_copy = g_string_free (name, FALSE);
      bare_method_name = bare_method_name_copy;
    }
    else
    {
      const gchar * name_begin;

      name_begin = bare_method_name + class_name_length + 1;
      if (is_constructor && strcmp (name_begin, "<clinit>") == 0)
        goto skip_method;

      if (is_constructor)
        bare_method_name = "$init";
      else
        bare_method_name += class_name_length + 1;
    }

    if (seen_method_names != NULL && g_hash_table_contains (seen_method_names, bare_method_name))
      goto skip_method;

    if (ctx->ignore_case)
    {
      normalized_method_name_copy = g_utf8_strdown (bare_method_name, -1);
      normalized_method_name = normalized_method_name_copy;
    }
    else
    {
      normalized_method_name = bare_method_name;
    }

    if (!g_pattern_match_string (ctx->method_query, normalized_method_name))
      goto skip_method;

    if (group == NULL)
    {
      group = g_hash_table_lookup (ctx->groups, GUINT_TO_POINTER (klass->class_loader));
      if (group == NULL)
      {
        group = json_builder_new_immutable ();
        g_hash_table_insert (ctx->groups, GUINT_TO_POINTER (klass->class_loader), group);

        json_builder_begin_object (group);

        json_builder_set_member_name (group, "loader");
        json_builder_add_int_value (group, klass->class_loader);

        json_builder_set_member_name (group, "classes");
        json_builder_begin_array (group);
      }

      json_builder_begin_object (group);

      json_builder_set_member_name (group, "name");
      json_builder_add_string_value (group, class_name);

      json_builder_set_member_name (group, "methods");
      json_builder_begin_array (group);
    }

    json_builder_add_string_value (group, bare_method_name);

    if (seen_method_names != NULL)
      g_hash_table_add (seen_method_names, g_strdup (bare_method_name));

skip_method:
    g_free (normalized_method_name_copy);
    g_free (bare_method_name_copy);
    std_string_destroy (&method_name);
  }

  if (seen_method_names != NULL)
    g_hash_table_unref (seen_method_names);

  if (group == NULL)
    goto skip_class;

  json_builder_end_array (group);
  json_builder_end_object (group);

skip_class:
  g_free (class_name_copy);
  g_free (class_name);
  std_string_destroy (&descriptor_storage);

  return TRUE;
}

gchar *
enumerate_methods_jvm (const gchar * class_query,
                       const gchar * method_query,
                       jboolean include_signature,
                       jboolean ignore_case,
                       jboolean skip_system_classes,
                       JNIEnv * env)
{
  gchar * result;
  GPatternSpec * class_pattern, * method_pattern;
  GHashTable * groups;
  gpointer * ef = env->functions;
  jobject (* new_global_ref) (JNIEnv *, jobject) = ef[21];
  void (* delete_local_ref) (JNIEnv *, jobject) = ef[23];
  jboolean (* is_same_object) (JNIEnv *, jobject, jobject) = ef[24];
  jvmtiEnv * jvmti = java_api.jvmti;
  gpointer * jf = jvmti->functions - 1;
  jvmtiError (* deallocate) (jvmtiEnv *, void * mem) = jf[47];
  jvmtiError (* get_class_signature) (jvmtiEnv *, jclass, char **, char **) = jf[48];
  jvmtiError (* get_class_methods) (jvmtiEnv *, jclass, jint *, jmethodID **) = jf[52];
  jvmtiError (* get_class_loader) (jvmtiEnv *, jclass, jobject *) = jf[57];
  jvmtiError (* get_method_name) (jvmtiEnv *, jmethodID, char **, char **, char **) = jf[64];
  jvmtiError (* get_loaded_classes) (jvmtiEnv *, jint *, jclass **) = jf[78];
  jint class_count, class_index;
  jclass * classes;

  class_pattern = make_pattern_spec (class_query, ignore_case);
  method_pattern = make_pattern_spec (method_query, ignore_case);
  groups = g_hash_table_new_full (NULL, NULL, NULL, NULL);

  if (get_loaded_classes (jvmti, &class_count, &classes) != JVMTI_ERROR_NONE)
    goto emit_results;

  for (class_index = 0; class_index != class_count; class_index++)
  {
    jclass klass = classes[class_index];
    jobject loader = NULL;
    gboolean have_loader = FALSE;
    char * signature = NULL;
    gchar * class_name = NULL;
    gchar * class_name_copy = NULL;
    const gchar * normalized_class_name;
    jint method_count, method_index;
    jmethodID * methods = NULL;
    JsonBuilder * group = NULL;
    GHashTable * seen_method_names = NULL;

    if (skip_system_classes)
    {
      if (get_class_loader (jvmti, klass, &loader) != JVMTI_ERROR_NONE)
        goto skip_class;
      have_loader = TRUE;

      if (loader == NULL)
        goto skip_class;
    }

    if (get_class_signature (jvmti, klass, &signature, NULL) != JVMTI_ERROR_NONE)
      goto skip_class;

    class_name = class_name_from_signature (signature);

    if (ignore_case)
    {
      class_name_copy = g_utf8_strdown (class_name, -1);
      normalized_class_name = class_name_copy;
    }
    else
    {
      normalized_class_name = class_name;
    }

    if (!g_pattern_match_string (class_pattern, normalized_class_name))
      goto skip_class;

    if (get_class_methods (jvmti, klass, &method_count, &methods) != JVMTI_ERROR_NONE)
      goto skip_class;

    if (!include_signature)
      seen_method_names = g_hash_table_new_full (g_str_hash, g_str_equal, g_free, NULL);

    for (method_index = 0; method_index != method_count; method_index++)
    {
      jmethodID method = methods[method_index];
      const gchar * method_name;
      char * method_name_value = NULL;
      char * method_signature_value = NULL;
      gchar * method_name_copy = NULL;
      const gchar * normalized_method_name;
      gchar * normalized_method_name_copy = NULL;

      if (get_method_name (jvmti, method, &method_name_value, include_signature ? &method_signature_value : NULL, NULL) != JVMTI_ERROR_NONE)
        goto skip_method;
      method_name = method_name_value;

      if (method_name[0] == '<')
      {
        if (strcmp (method_name, "<init>") == 0)
          method_name = "$init";
        else if (strcmp (method_name, "<clinit>") == 0)
          goto skip_method;
      }

      if (include_signature)
      {
        method_name_copy = format_method_signature (method_name, method_signature_value);
        method_name = method_name_copy;
      }

      if (seen_method_names != NULL && g_hash_table_contains (seen_method_names, method_name))
        goto skip_method;

      if (ignore_case)
      {
        normalized_method_name_copy = g_utf8_strdown (method_name, -1);
        normalized_method_name = normalized_method_name_copy;
      }
      else
      {
        normalized_method_name = method_name;
      }

      if (!g_pattern_match_string (method_pattern, normalized_method_name))
        goto skip_method;

      if (group == NULL)
      {
        if (!have_loader && get_class_loader (jvmti, klass, &loader) != JVMTI_ERROR_NONE)
          goto skip_method;

        if (loader == NULL)
        {
          group = g_hash_table_lookup (groups, NULL);
        }
        else
        {
          GHashTableIter iter;
          jobject cur_loader;
          JsonBuilder * cur_group;

          g_hash_table_iter_init (&iter, groups);
          while (g_hash_table_iter_next (&iter, (gpointer *) &cur_loader, (gpointer *) &cur_group))
          {
            if (cur_loader != NULL && is_same_object (env, cur_loader, loader))
            {
              group = cur_group;
              break;
            }
          }
        }

        if (group == NULL)
        {
          jobject l;
          gchar * str;

          l = (loader != NULL) ? new_global_ref (env, loader) : NULL;

          group = json_builder_new_immutable ();
          g_hash_table_insert (groups, l, group);

          json_builder_begin_object (group);

          json_builder_set_member_name (group, "loader");
          str = g_strdup_printf ("0x%" G_GSIZE_MODIFIER "x", GPOINTER_TO_SIZE (l));
          json_builder_add_string_value (group, str);
          g_free (str);

          json_builder_set_member_name (group, "classes");
          json_builder_begin_array (group);
        }

        json_builder_begin_object (group);

        json_builder_set_member_name (group, "name");
        json_builder_add_string_value (group, class_name);

        json_builder_set_member_name (group, "methods");
        json_builder_begin_array (group);
      }

      json_builder_add_string_value (group, method_name);

      if (seen_method_names != NULL)
        g_hash_table_add (seen_method_names, g_strdup (method_name));

skip_method:
      g_free (normalized_method_name_copy);
      g_free (method_name_copy);
      deallocate (jvmti, method_signature_value);
      deallocate (jvmti, method_name_value);
    }

skip_class:
    if (group != NULL)
    {
      json_builder_end_array (group);
      json_builder_end_object (group);
    }

    if (seen_method_names != NULL)
      g_hash_table_unref (seen_method_names);

    deallocate (jvmti, methods);

    g_free (class_name_copy);
    g_free (class_name);
    deallocate (jvmti, signature);

    if (loader != NULL)
      delete_local_ref (env, loader);

    delete_local_ref (env, klass);
  }

  deallocate (jvmti, classes);

emit_results:
  result = finalize_method_groups_to_json (groups);

  g_hash_table_unref (groups);
  g_pattern_spec_free (method_pattern);
  g_pattern_spec_free (class_pattern);

  return result;
}

static gchar *
finalize_method_groups_to_json (GHashTable * groups)
{
  GString * result;
  GHashTableIter iter;
  guint i;
  JsonBuilder * group;

  result = g_string_sized_new (1024);

  g_string_append_c (result, '[');

  g_hash_table_iter_init (&iter, groups);
  for (i = 0; g_hash_table_iter_next (&iter, NULL, (gpointer *) &group); i++)
  {
    JsonNode * root;
    gchar * json;

    if (i > 0)
      g_string_append_c (result, ',');

    json_builder_end_array (group);
    json_builder_end_object (group);

    root = json_builder_get_root (group);
    json = json_to_string (root, FALSE);
    g_string_append (result, json);
    g_free (json);
    json_node_unref (root);

    g_object_unref (group);
  }

  g_string_append_c (result, ']');

  return g_string_free (result, FALSE);
}

static GPatternSpec *
make_pattern_spec (const gchar * pattern,
                   jboolean ignore_case)
{
  GPatternSpec * spec;

  if (ignore_case)
  {
    gchar * str = g_utf8_strdown (pattern, -1);
    spec = g_pattern_spec_new (str);
    g_free (str);
  }
  else
  {
    spec = g_pattern_spec_new (pattern);
  }

  return spec;
}

static gchar *
class_name_from_signature (const gchar * descriptor)
{
  gchar * result, * c;

  result = g_strdup (descriptor + 1);

  for (c = result; *c != '\\0'; c++)
  {
    if (*c == '/')
      *c = '.';
  }

  c[-1] = '\\0';

  return result;
}

static gchar *
format_method_signature (const gchar * name,
                         const gchar * signature)
{
  GString * sig;
  const gchar * cursor;
  gint arg_index;

  sig = g_string_sized_new (128);

  g_string_append (sig, name);

  cursor = signature;
  arg_index = -1;
  while (TRUE)
  {
    const gchar c = *cursor;

    if (c == '(')
    {
      g_string_append_c (sig, c);
      cursor++;
      arg_index = 0;
    }
    else if (c == ')')
    {
      g_string_append_c (sig, c);
      cursor++;
      break;
    }
    else
    {
      if (arg_index >= 1)
        g_string_append (sig, ", ");

      append_type (sig, &cursor);

      if (arg_index != -1)
        arg_index++;
    }
  }

  g_string_append (sig, ": ");
  append_type (sig, &cursor);

  return g_string_free (sig, FALSE);
}

static void
append_type (GString * output,
             const gchar ** type)
{
  const gchar * cursor = *type;

  switch (*cursor)
  {
    case 'Z':
      g_string_append (output, "boolean");
      cursor++;
      break;
    case 'B':
      g_string_append (output, "byte");
      cursor++;
      break;
    case 'C':
      g_string_append (output, "char");
      cursor++;
      break;
    case 'S':
      g_string_append (output, "short");
      cursor++;
      break;
    case 'I':
      g_string_append (output, "int");
      cursor++;
      break;
    case 'J':
      g_string_append (output, "long");
      cursor++;
      break;
    case 'F':
      g_string_append (output, "float");
      cursor++;
      break;
    case 'D':
      g_string_append (output, "double");
      cursor++;
      break;
    case 'V':
      g_string_append (output, "void");
      cursor++;
      break;
    case 'L':
    {
      gchar ch;

      cursor++;
      for (; (ch = *cursor) != ';'; cursor++)
      {
        g_string_append_c (output, (ch != '/') ? ch : '.');
      }
      cursor++;

      break;
    }
    case '[':
      *type = cursor + 1;
      append_type (output, type);
      g_string_append (output, "[]");
      return;
    default:
      g_string_append (output, "BUG");
      cursor++;
  }

  *type = cursor;
}

void
dealloc (gpointer mem)
{
  g_free (mem);
}

static gpointer
read_art_array (gpointer object_base,
                guint field_offset,
                guint length_size,
                guint * length)
{
  gpointer result, header;
  guint n;

  header = GSIZE_TO_POINTER (*(guint64 *) (object_base + field_offset));
  if (header != NULL)
  {
    result = header + length_size;
    if (length_size == sizeof (guint32))
      n = *(guint32 *) header;
    else
      n = *(guint64 *) header;
  }
  else
  {
    result = NULL;
    n = 0;
  }

  if (length != NULL)
    *length = n;

  return result;
}

static void
std_string_destroy (StdString * str)
{
  if ((str->l.capacity & 1) != 0)
    art_api.free (str->l.data);
}

static gchar *
std_string_c_str (StdString * self)
{
  if ((self->l.capacity & 1) != 0)
    return self->l.data;

  return self->s.data;
}
`,Od=/(.+)!([^/]+)\/?([isu]+)?/,ke=null,Ks=null,We=class t{static build(e,n){return Ws(n),Ks(e,n,r=>new t(ke.new(e,r,n)))}static enumerateMethods(e,n,r){Ws(r);let s=e.match(Od);if(s===null)throw new Error("Invalid query; format is: class!method -- see documentation of Java.enumerateMethods(query) for details");let o=Memory.allocUtf8String(s[1]),i=Memory.allocUtf8String(s[2]),a=!1,c=!1,l=!1,d=s[3];d!==void 0&&(a=d.indexOf("s")!==-1,c=d.indexOf("i")!==-1,l=d.indexOf("u")!==-1);let f;if(n.jvmti!==null){let h=ke.enumerateMethodsJvm(o,i,st(a),st(c),st(l),r);try{f=JSON.parse(h.readUtf8String()).map(u=>{let m=ptr(u.loader);return u.loader=m.isNull()?null:m,u})}finally{ke.dealloc(h)}}else Me(r.vm,r,h=>{let u=ke.enumerateMethodsArt(o,i,st(a),st(c),st(l));try{let m=n["art::JavaVMExt::AddGlobalRef"],{vm:p}=n;f=JSON.parse(u.readUtf8String()).map(g=>{let y=g.loader;return g.loader=y!==0?m(p,h,ptr(y)):null,g})}finally{ke.dealloc(u)}});return f}constructor(e){this.handle=e}has(e){return ke.has(this.handle,Memory.allocUtf8String(e))!==0}find(e){return ke.find(this.handle,Memory.allocUtf8String(e)).readUtf8String()}list(){let e=ke.list(this.handle);try{return JSON.parse(e.readUtf8String())}finally{ke.dealloc(e)}}};function Ws(t){ke===null&&(ke=Rd(t),Ks=Pd(ke,t.vm))}function Rd(t){let e=At(),{jvmti:n=null}=e,{pointerSize:r}=Process,s=8,o=r,i=7*r,a=10*4+5*r,c=s+o+i+a,d=Memory.alloc(c),f=d.add(s),h=f.add(o),{getDeclaredMethods:u,getDeclaredFields:m}=t.javaLangClass(),p=t.javaLangReflectMethod(),g=t.javaLangReflectField(),y=h;[n!==null?n:NULL,u,m,p.getName,p.getModifiers,g.getName,g.getModifiers].forEach(I=>{y=y.writePointer(I).add(r)});let E=h.add(i),{vm:O}=t;if(e.flavor==="art"){let I,R=n!==null||kd()<37;if(!R||n!==null)I=[0,0,0,0];else{let v=ar(O).offset;I=[v.ifields,v.methods,v.sfields,v.copiedMethodsOffset]}let N=xe(O),T=Wt(O),F=E;[R?1:0,...I,N.size,N.offset.accessFlags,T.size,T.offset.accessFlags,4294967295].forEach(v=>{F=F.writeUInt(v).add(4)}),[e.artClassLinker.address,e["art::ClassLinker::VisitClasses"],e["art::mirror::Class::GetDescriptor"],e["art::ArtMethod::PrettyMethod"],Process.getModuleByName("libc.so").getExportByName("free")].forEach((v,U)=>{v===void 0&&(v=NULL),F=F.writePointer(v).add(r)})}let k=new CModule(jd,{lock:d,models:f,java_api:h,art_api:E}),C={exceptions:"propagate"},P={exceptions:"propagate",scheduling:"exclusive"};return{handle:k,new:new NativeFunction(k.model_new,"pointer",["pointer","pointer","pointer"],C),has:new NativeFunction(k.model_has,"bool",["pointer","pointer"],P),find:new NativeFunction(k.model_find,"pointer",["pointer","pointer"],P),list:new NativeFunction(k.model_list,"pointer",["pointer"],P),enumerateMethodsArt:new NativeFunction(k.enumerate_methods_art,"pointer",["pointer","pointer","bool","bool","bool"],C),enumerateMethodsJvm:new NativeFunction(k.enumerate_methods_jvm,"pointer",["pointer","pointer","bool","bool","bool","pointer"],C),dealloc:new NativeFunction(k.dealloc,"void",["pointer"],P)}}function Pd(t,e){let n=At();if(n.flavor!=="art")return Id;let r=n["art::JavaVMExt::DecodeGlobal"];return function(s,o,i){let a;return Me(e,o,c=>{let l=r(e,c,s);a=i(l)}),a}}function Id(t,e,n){return n(NULL)}function st(t){return t?1:0}var Nt=class{constructor(e,n){this.items=new Map,this.capacity=e,this.destroy=n}dispose(e){let{items:n,destroy:r}=this;n.forEach(s=>{r(s,e)}),n.clear()}get(e){let{items:n}=this,r=n.get(e);return r!==void 0&&(n.delete(e),n.set(e,r)),r}set(e,n,r){let{items:s}=this,o=s.get(e);if(o!==void 0)s.delete(e),this.destroy(o,r);else if(s.size===this.capacity){let i=s.keys().next().value,a=s.get(i);s.delete(i),this.destroy(a,r)}s.set(e,n)}};var Lt=1,xr=256,Ys=65536,Fd=305419896,Qs=32,Xs=12,eo=8,to=8,no=4,ro=4,so=12,Cd=0,Ud=1,Dd=2,zd=3,Gd=4,Vd=5,Bd=6,$d=4096,Jd=4097,Hd=4099,Zd=8192,qd=8193,Wd=8194,Kd=8195,Yd=8196,Qd=8198,Xd=24,eu=28,tu=2,nu=24,oo=_.from([3,0,7,14,0]),wr="Ldalvik/annotation/Throws;",ru=_.from([0]);function su(t){let e=new Ar,n=Object.assign({},t);return e.addClass(n),e.build()}var Ar=class{constructor(){this.classes=[]}addClass(e){this.classes.push(e)}build(){let e=au(this.classes),{classes:n,interfaces:r,fields:s,methods:o,protos:i,parameters:a,annotationDirectories:c,annotationSets:l,throwsAnnotations:d,types:f,strings:h}=e,u=0,m=0,p=8,g=12,y=20,E=112;u+=E;let O=u,k=h.length*ro;u+=k;let C=u,P=f.length*no;u+=P;let I=u,R=i.length*Xs;u+=R;let N=u,T=s.length*eo;u+=T;let F=u,v=o.length*to;u+=v;let U=u,V=n.length*Qs;u+=V;let B=u,G=l.map(M=>{let z=u;return M.offset=z,u+=4+M.items.length*4,z}),$=n.reduce((M,z)=>(z.classData.constructorMethods.forEach(K=>{let[,Q,Y]=K;(Q&xr)===0&&Y>=0&&(K.push(u),M.push({offset:u,superConstructor:Y}),u+=nu)}),M),[]);c.forEach(M=>{M.offset=u,u+=16+M.methods.length*8});let ie=r.map(M=>{u=Tr(u,4);let z=u;return M.offset=z,u+=4+2*M.types.length,z}),de=a.map(M=>{u=Tr(u,4);let z=u;return M.offset=z,u+=4+2*M.types.length,z}),_e=[],te=h.map(M=>{let z=u,J=_.from(Ae(M.length)),K=_.from(M,"utf8"),Q=_.concat([J,K,ru]);return _e.push(Q),u+=Q.length,z}),he=$.map(M=>{let z=u;return u+=oo.length,z}),ne=d.map(M=>{let z=iu(M);return M.offset=u,u+=z.length,z}),ue=n.map((M,z)=>{M.classData.offset=u;let J=ou(M);return u+=J.length,J}),Oe=0,lt=0;u=Tr(u,4);let W=u,Te=r.length+a.length,Fe=4+(s.length>0?1:0)+2+l.length+$.length+c.length+(Te>0?1:0)+1+he.length+d.length+n.length+1,$e=4+Fe*so;u+=$e;let Ge=u-B,Qe=u,L=_.alloc(Qe);L.write(`dex
035`),L.writeUInt32LE(Qe,32),L.writeUInt32LE(E,36),L.writeUInt32LE(Fd,40),L.writeUInt32LE(Oe,44),L.writeUInt32LE(lt,48),L.writeUInt32LE(W,52),L.writeUInt32LE(h.length,56),L.writeUInt32LE(O,60),L.writeUInt32LE(f.length,64),L.writeUInt32LE(C,68),L.writeUInt32LE(i.length,72),L.writeUInt32LE(I,76),L.writeUInt32LE(s.length,80),L.writeUInt32LE(s.length>0?N:0,84),L.writeUInt32LE(o.length,88),L.writeUInt32LE(F,92),L.writeUInt32LE(n.length,96),L.writeUInt32LE(U,100),L.writeUInt32LE(Ge,104),L.writeUInt32LE(B,108),te.forEach((M,z)=>{L.writeUInt32LE(M,O+z*ro)}),f.forEach((M,z)=>{L.writeUInt32LE(M,C+z*no)}),i.forEach((M,z)=>{let[J,K,Q]=M,Y=I+z*Xs;L.writeUInt32LE(J,Y),L.writeUInt32LE(K,Y+4),L.writeUInt32LE(Q!==null?Q.offset:0,Y+8)}),s.forEach((M,z)=>{let[J,K,Q]=M,Y=N+z*eo;L.writeUInt16LE(J,Y),L.writeUInt16LE(K,Y+2),L.writeUInt32LE(Q,Y+4)}),o.forEach((M,z)=>{let[J,K,Q]=M,Y=F+z*to;L.writeUInt16LE(J,Y),L.writeUInt16LE(K,Y+2),L.writeUInt32LE(Q,Y+4)}),n.forEach((M,z)=>{let{interfaces:J,annotationsDirectory:K}=M,Q=J!==null?J.offset:0,Y=K!==null?K.offset:0,dt=0,Ne=U+z*Qs;L.writeUInt32LE(M.index,Ne),L.writeUInt32LE(M.accessFlags,Ne+4),L.writeUInt32LE(M.superClassIndex,Ne+8),L.writeUInt32LE(Q,Ne+12),L.writeUInt32LE(M.sourceFileIndex,Ne+16),L.writeUInt32LE(Y,Ne+20),L.writeUInt32LE(M.classData.offset,Ne+24),L.writeUInt32LE(dt,Ne+28)}),l.forEach((M,z)=>{let{items:J}=M,K=G[z];L.writeUInt32LE(J.length,K),J.forEach((Q,Y)=>{L.writeUInt32LE(Q.offset,K+4+Y*4)})}),$.forEach((M,z)=>{let{offset:J,superConstructor:K}=M,Q=1,Y=1,dt=1,Ne=0,jt=4;L.writeUInt16LE(Q,J),L.writeUInt16LE(Y,J+2),L.writeUInt16LE(dt,J+4),L.writeUInt16LE(Ne,J+6),L.writeUInt32LE(he[z],J+8),L.writeUInt32LE(jt,J+12),L.writeUInt16LE(4208,J+16),L.writeUInt16LE(K,J+18),L.writeUInt16LE(0,J+20),L.writeUInt16LE(14,J+22)}),c.forEach(M=>{let z=M.offset,J=0,K=0,Q=M.methods.length,Y=0;L.writeUInt32LE(J,z),L.writeUInt32LE(K,z+4),L.writeUInt32LE(Q,z+8),L.writeUInt32LE(Y,z+12),M.methods.forEach((dt,Ne)=>{let jt=z+16+Ne*8,[Ro,Po]=dt;L.writeUInt32LE(Ro,jt),L.writeUInt32LE(Po.offset,jt+4)})}),r.forEach((M,z)=>{let J=ie[z];L.writeUInt32LE(M.types.length,J),M.types.forEach((K,Q)=>{L.writeUInt16LE(K,J+4+Q*2)})}),a.forEach((M,z)=>{let J=de[z];L.writeUInt32LE(M.types.length,J),M.types.forEach((K,Q)=>{L.writeUInt16LE(K,J+4+Q*2)})}),_e.forEach((M,z)=>{M.copy(L,te[z])}),he.forEach(M=>{oo.copy(L,M)}),ne.forEach((M,z)=>{M.copy(L,d[z].offset)}),ue.forEach((M,z)=>{M.copy(L,n[z].classData.offset)}),L.writeUInt32LE(Fe,W);let ge=[[Cd,1,m],[Ud,h.length,O],[Dd,f.length,C],[zd,i.length,I]];s.length>0&&ge.push([Gd,s.length,N]),ge.push([Vd,o.length,F]),ge.push([Bd,n.length,U]),l.forEach((M,z)=>{ge.push([Hd,M.items.length,G[z]])}),$.forEach(M=>{ge.push([qd,1,M.offset])}),c.forEach(M=>{ge.push([Qd,1,M.offset])}),Te>0&&ge.push([Jd,Te,ie.concat(de)[0]]),ge.push([Wd,h.length,te[0]]),he.forEach(M=>{ge.push([Kd,1,M])}),d.forEach(M=>{ge.push([Yd,1,M.offset])}),n.forEach(M=>{ge.push([Zd,1,M.classData.offset])}),ge.push([$d,1,W]),ge.forEach((M,z)=>{let[J,K,Q]=M,Y=W+4+z*so;L.writeUInt16LE(J,Y),L.writeUInt32LE(K,Y+4),L.writeUInt32LE(Q,Y+8)});let $r=new Checksum("sha1");return $r.update(L.slice(g+y)),_.from($r.getDigest()).copy(L,g),L.writeUInt32LE(hu(L,g),p),L}};function ou(t){let{instanceFields:e,constructorMethods:n,virtualMethods:r}=t.classData;return _.from([0].concat(Ae(e.length)).concat(Ae(n.length)).concat(Ae(r.length)).concat(e.reduce((o,[i,a])=>o.concat(Ae(i)).concat(Ae(a)),[])).concat(n.reduce((o,[i,a,,c])=>o.concat(Ae(i)).concat(Ae(a)).concat(Ae(c||0)),[])).concat(r.reduce((o,[i,a])=>o.concat(Ae(i)).concat(Ae(a)).concat([0]),[])))}function iu(t){let{thrownTypes:e}=t;return _.from([tu].concat(Ae(t.type)).concat([1]).concat(Ae(t.value)).concat([eu,e.length]).concat(e.reduce((n,r)=>(n.push(Xd,r),n),[])))}function au(t){let e=new Set,n=new Set,r={},s=[],o=[],i={},a=new Set,c=new Set;t.forEach(v=>{let{name:U,superClass:V,sourceFileName:B}=v;e.add("this"),e.add(U),n.add(U),e.add(V),n.add(V),e.add(B),v.interfaces.forEach(G=>{e.add(G),n.add(G)}),v.fields.forEach(G=>{let[$,ie]=G;e.add($),e.add(ie),n.add(ie),s.push([v.name,ie,$])}),v.methods.some(([G])=>G==="<init>")||(v.methods.unshift(["<init>","V",[]]),a.add(U)),v.methods.forEach(G=>{let[$,ie,de,_e=[],te]=G;e.add($);let he=l(ie,de),ne=null;if(_e.length>0){let ue=_e.slice();ue.sort(),ne=ue.join("|");let Oe=i[ne];Oe===void 0&&(Oe={id:ne,types:ue},i[ne]=Oe),e.add(wr),n.add(wr),_e.forEach(lt=>{e.add(lt),n.add(lt)}),e.add("value")}if(o.push([v.name,he,$,ne,te]),$==="<init>"){c.add(U+"|"+he);let ue=V+"|"+he;a.has(U)&&!c.has(ue)&&(o.push([V,he,$,null,0]),c.add(ue))}})});function l(v,U){let V=[v].concat(U),B=V.join("|");if(r[B]!==void 0)return B;e.add(v),n.add(v),U.forEach($=>{e.add($),n.add($)});let G=V.map(fu).join("");return e.add(G),r[B]=[B,G,v,U],B}let d=Array.from(e);d.sort();let f=d.reduce((v,U,V)=>(v[U]=V,v),{}),h=Array.from(n).map(v=>f[v]);h.sort(io);let u=h.reduce((v,U,V)=>(v[d[U]]=V,v),{}),m=Object.keys(r).map(v=>r[v]);m.sort(lu);let p={},g=m.map(v=>{let[,U,V,B]=v,G;if(B.length>0){let $=B.join("|");G=p[$],G===void 0&&(G={types:B.map(ie=>u[ie]),offset:-1},p[$]=G)}else G=null;return[f[U],u[V],G]}),y=m.reduce((v,U,V)=>{let[B]=U;return v[B]=V,v},{}),E=Object.keys(p).map(v=>p[v]),O=s.map(v=>{let[U,V,B]=v;return[u[U],u[V],f[B]]});O.sort(du);let k=o.map(v=>{let[U,V,B,G,$]=v;return[u[U],y[V],f[B],G,$]});k.sort(uu);let C=Object.keys(i).map(v=>i[v]).map(v=>({id:v.id,type:u[wr],value:f.value,thrownTypes:v.types.map(U=>u[U]),offset:-1})),P=C.map(v=>({id:v.id,items:[v],offset:-1})),I=P.reduce((v,U,V)=>(v[U.id]=V,v),{}),R={},N=[],T=t.map(v=>{let U=u[v.name],V=Lt,B=u[v.superClass],G,$=v.interfaces.map(W=>u[W]);if($.length>0){$.sort(io);let W=$.join("|");G=R[W],G===void 0&&(G={types:$,offset:-1},R[W]=G)}else G=null;let ie=f[v.sourceFileName],de=k.reduce((W,Te,Fe)=>{let[$e,Ge,Qe,L,ge]=Te;return $e===U&&W.push([Fe,Qe,L,Ge,ge]),W},[]),_e=null,te=de.filter(([,,W])=>W!==null).map(([W,,Te])=>[W,P[I[Te]]]);te.length>0&&(_e={methods:te,offset:-1},N.push(_e));let he=O.reduce((W,Te,Fe)=>{let[$e]=Te;return $e===U&&W.push([Fe>0?1:0,Lt]),W},[]),ne=f["<init>"],ue=de.filter(([,W])=>W===ne).map(([W,,,Te])=>{if(a.has(v.name)){let Fe=-1,$e=k.length;for(let Ge=0;Ge!==$e;Ge++){let[Qe,L,ge]=k[Ge];if(Qe===B&&ge===ne&&L===Te){Fe=Ge;break}}return[W,Lt|Ys,Fe]}else return[W,Lt|Ys|xr,-1]}),Oe=cu(de.filter(([,W])=>W!==ne).map(([W,,,,Te])=>[W,Te|Lt|xr]));return{index:U,accessFlags:V,superClassIndex:B,interfaces:G,sourceFileIndex:ie,annotationsDirectory:_e,classData:{instanceFields:he,constructorMethods:ue,virtualMethods:Oe,offset:-1}}}),F=Object.keys(R).map(v=>R[v]);return{classes:T,interfaces:F,fields:O,methods:k,protos:g,parameters:E,annotationDirectories:N,annotationSets:P,throwsAnnotations:C,types:h,strings:d}}function cu(t){let e=0;return t.map(([n,r],s)=>{let o;return s===0?o=[n,r]:o=[n-e,r],e=n,o})}function io(t,e){return t-e}function lu(t,e){let[,,n,r]=t,[,,s,o]=e;if(n<s)return-1;if(n>s)return 1;let i=r.join("|"),a=o.join("|");return i<a?-1:i>a?1:0}function du(t,e){let[n,r,s]=t,[o,i,a]=e;return n!==o?n-o:s!==a?s-a:r-i}function uu(t,e){let[n,r,s]=t,[o,i,a]=e;return n!==o?n-o:s!==a?s-a:r-i}function fu(t){let e=t[0];return e==="L"||e==="["?"L":t}function Ae(t){if(t<=127)return[t];let e=[],n=!1;do{let r=t&127;t>>=7,n=t!==0,n&&(r|=128),e.push(r)}while(n);return e}function Tr(t,e){let n=t%e;return n===0?t:t+e-n}function hu(t,e){let n=1,r=0,s=t.length;for(let o=e;o<s;o++)n=(n+t[o])%65521,r=(r+n)%65521;return(r<<16|n)>>>0}var ao=su;var pu=1,Nr=null,co=null;function lo(t){Nr=t}function Lr(t,e,n){let r=ot(t);return r===null&&(t.indexOf("[")===0?r=Mr(t,e,n):(t[0]==="L"&&t[t.length-1]===";"&&(t=t.substring(1,t.length-1)),r=_u(t,e,n))),Object.assign({className:t},r)}var uo={boolean:{name:"Z",type:"uint8",size:1,byteSize:1,defaultValue:!1,isCompatible(t){return typeof t=="boolean"},fromJni(t){return!!t},toJni(t){return t?1:0},read(t){return t.readU8()},write(t,e){t.writeU8(e)},toString(){return this.name}},byte:{name:"B",type:"int8",size:1,byteSize:1,defaultValue:0,isCompatible(t){return Number.isInteger(t)&&t>=-128&&t<=127},fromJni:je,toJni:je,read(t){return t.readS8()},write(t,e){t.writeS8(e)},toString(){return this.name}},char:{name:"C",type:"uint16",size:1,byteSize:2,defaultValue:0,isCompatible(t){if(typeof t!="string"||t.length!==1)return!1;let e=t.charCodeAt(0);return e>=0&&e<=65535},fromJni(t){return String.fromCharCode(t)},toJni(t){return t.charCodeAt(0)},read(t){return t.readU16()},write(t,e){t.writeU16(e)},toString(){return this.name}},short:{name:"S",type:"int16",size:1,byteSize:2,defaultValue:0,isCompatible(t){return Number.isInteger(t)&&t>=-32768&&t<=32767},fromJni:je,toJni:je,read(t){return t.readS16()},write(t,e){t.writeS16(e)},toString(){return this.name}},int:{name:"I",type:"int32",size:1,byteSize:4,defaultValue:0,isCompatible(t){return Number.isInteger(t)&&t>=-2147483648&&t<=2147483647},fromJni:je,toJni:je,read(t){return t.readS32()},write(t,e){t.writeS32(e)},toString(){return this.name}},long:{name:"J",type:"int64",size:2,byteSize:8,defaultValue:0,isCompatible(t){return typeof t=="number"||t instanceof Int64},fromJni:je,toJni:je,read(t){return t.readS64()},write(t,e){t.writeS64(e)},toString(){return this.name}},float:{name:"F",type:"float",size:1,byteSize:4,defaultValue:0,isCompatible(t){return typeof t=="number"},fromJni:je,toJni:je,read(t){return t.readFloat()},write(t,e){t.writeFloat(e)},toString(){return this.name}},double:{name:"D",type:"double",size:2,byteSize:8,defaultValue:0,isCompatible(t){return typeof t=="number"},fromJni:je,toJni:je,read(t){return t.readDouble()},write(t,e){t.writeDouble(e)},toString(){return this.name}},void:{name:"V",type:"void",size:0,byteSize:0,defaultValue:void 0,isCompatible(t){return t===void 0},fromJni(){},toJni(){return NULL},toString(){return this.name}}},mu=new Set(Object.values(uo).map(t=>t.name));function ot(t){let e=uo[t];return e!==void 0?e:null}function _u(t,e,n){let r=n._types[e?1:0],s=r[t];return s!==void 0||(t==="java.lang.Object"?s=gu(n):s=yu(t,e,n),r[t]=s),s}function gu(t){return{name:"Ljava/lang/Object;",type:"pointer",size:1,defaultValue:NULL,isCompatible(e){return e===null?!0:e===void 0?!1:e.$h instanceof NativePointer?!0:typeof e=="string"},fromJni(e,n,r){return e.isNull()?null:t.cast(e,t.use("java.lang.Object"),r)},toJni(e,n){return e===null?NULL:typeof e=="string"?n.newStringUtf(e):e.$h}}}function yu(t,e,n){let r=null,s=null,o=null;function i(){return r===null&&(r=n.use(t).class),r}function a(l){let d=i();return s===null&&(s=d.isInstance.overload("java.lang.Object")),s.call(d,l)}function c(){if(o===null){let l=i();o=n.use("java.lang.String").class.isAssignableFrom(l)}return o}return{name:Ke(t),type:"pointer",size:1,defaultValue:NULL,isCompatible(l){return l===null?!0:l===void 0?!1:l.$h instanceof NativePointer?a(l):typeof l=="string"&&c()},fromJni(l,d,f){return l.isNull()?null:c()&&e?d.stringFromJni(l):n.cast(l,n.use(t),f)},toJni(l,d){return l===null?NULL:typeof l=="string"?d.newStringUtf(l):l.$h},toString(){return this.name}}}var bu=[["Z","boolean"],["B","byte"],["C","char"],["D","double"],["F","float"],["I","int"],["J","long"],["S","short"]].reduce((t,[e,n])=>(t["["+e]=Eu("["+e,n),t),{});function Eu(t,e){let n=b.prototype,r=xu(e),s={typeName:e,newArray:n["new"+r+"Array"],setRegion:n["set"+r+"ArrayRegion"],getElements:n["get"+r+"ArrayElements"],releaseElements:n["release"+r+"ArrayElements"]};return{name:t,type:"pointer",size:1,defaultValue:NULL,isCompatible(o){return Tu(o,e)},fromJni(o,i,a){return vu(o,s,i,a)},toJni(o,i){return wu(o,s,i)}}}function Mr(t,e,n){let r=bu[t];if(r!==void 0)return r;if(t.indexOf("[")!==0)throw new Error("Unsupported type: "+t);let s=t.substring(1),o=Lr(s,e,n),i=0,a=s.length;for(;i!==a&&s[i]==="[";)i++;s=s.substring(i),s[0]==="L"&&s[s.length-1]===";"&&(s=s.substring(1,s.length-1));let c=s.replace(/\./g,"/");mu.has(c)?c="[".repeat(i)+c:c="[".repeat(i)+"L"+c+";";let l="["+c;return s="[".repeat(i)+s,{name:t.replace(/\./g,"/"),type:"pointer",size:1,defaultValue:NULL,isCompatible(d){return d===null?!0:typeof d!="object"||d.length===void 0?!1:d.every(function(f){return o.isCompatible(f)})},fromJni(d,f,h){if(d.isNull())return null;let u=[],m=f.getArrayLength(d);for(let p=0;p!==m;p++){let g=f.getObjectArrayElement(d,p);try{u.push(o.fromJni(g,f))}finally{f.deleteLocalRef(g)}}try{u.$w=n.cast(d,n.use(l),h)}catch{n.use("java.lang.reflect.Array").newInstance(n.use(s).class,0),u.$w=n.cast(d,n.use(l),h)}return u.$dispose=Su,u},toJni(d,f){if(d===null)return NULL;if(!(d instanceof Array))throw new Error("Expected an array");let h=d.$w;if(h!==void 0)return h.$h;let u=d.length,p=n.use(s).$borrowClassHandle(f);try{let g=f.newObjectArray(u,p.value,NULL);f.throwIfExceptionPending();for(let y=0;y!==u;y++){let E=o.toJni(d[y],f);try{f.setObjectArrayElement(g,y,E)}finally{o.type==="pointer"&&f.getObjectRefType(E)===pu&&f.deleteLocalRef(E)}f.throwIfExceptionPending()}return g}finally{p.unref(f)}}}}function Su(){let t=this.length;for(let e=0;e!==t;e++){let n=this[e];if(n===null)continue;let r=n.$dispose;if(r===void 0)break;r.call(n)}this.$w.$dispose()}function vu(t,e,n,r){if(t.isNull())return null;let s=ot(e.typeName),o=n.getArrayLength(t);return new Xt(t,e,s,o,n,r)}function wu(t,e,n){if(t===null)return NULL;let r=t.$h;if(r!==void 0)return r;let s=t.length,o=ot(e.typeName),i=e.newArray.call(n,s);if(i.isNull())throw new Error("Unable to construct array");if(s>0){let a=o.byteSize,c=o.write,l=o.toJni,d=Memory.alloc(s*o.byteSize);for(let f=0;f!==s;f++)c(d.add(f*a),l(t[f]));e.setRegion.call(n,i,0,s,d),n.throwIfExceptionPending()}return i}function Tu(t,e){if(t===null)return!0;if(t instanceof Xt)return t.$s.typeName===e;if(!(typeof t=="object"&&t.length!==void 0))return!1;let r=ot(e);return Array.prototype.every.call(t,s=>r.isCompatible(s))}function Xt(t,e,n,r,s,o=!0){if(o){let i=s.newGlobalRef(t);this.$h=i,this.$r=Script.bindWeak(this,s.vm.makeHandleDestructor(i))}else this.$h=t,this.$r=null;return this.$s=e,this.$t=n,this.length=r,new Proxy(this,co)}co={has(t,e){return e in t?!0:t.tryParseIndex(e)!==null},get(t,e,n){let r=t.tryParseIndex(e);return r===null?t[e]:t.readElement(r)},set(t,e,n,r){let s=t.tryParseIndex(e);return s===null?(t[e]=n,!0):(t.writeElement(s,n),!0)},ownKeys(t){let e=[],{length:n}=t;for(let r=0;r!==n;r++){let s=r.toString();e.push(s)}return e.push("length"),e},getOwnPropertyDescriptor(t,e){return t.tryParseIndex(e)!==null?{writable:!0,configurable:!0,enumerable:!0}:Object.getOwnPropertyDescriptor(t,e)}};Object.defineProperties(Xt.prototype,{$dispose:{enumerable:!0,value(){let t=this.$r;t!==null&&(this.$r=null,Script.unbindWeak(t))}},$clone:{value(t){return new Xt(this.$h,this.$s,this.$t,this.length,t)}},tryParseIndex:{value(t){if(typeof t=="symbol")return null;let e=parseInt(t);return isNaN(e)||e<0||e>=this.length?null:e}},readElement:{value(t){return this.withElements(e=>{let n=this.$t;return n.fromJni(n.read(e.add(t*n.byteSize)))})}},writeElement:{value(t,e){let{$h:n,$s:r,$t:s}=this,o=Nr.getEnv(),i=Memory.alloc(s.byteSize);s.write(i,s.toJni(e)),r.setRegion.call(o,n,t,1,i)}},withElements:{value(t){let{$h:e,$s:n}=this,r=Nr.getEnv(),s=n.getElements.call(r,e);if(s.isNull())throw new Error("Unable to get array elements");try{return t(s)}finally{n.releaseElements.call(r,e,s)}}},toJSON:{value(){let{length:t,$t:e}=this,{byteSize:n,fromJni:r,read:s}=e;return this.withElements(o=>{let i=[];for(let a=0;a!==t;a++){let c=r(s(o.add(a*n)));i.push(c)}return i})}},toString:{value(){return this.toJSON().toString()}}});function Ke(t){return"L"+t.replace(/\./g,"/")+";"}function xu(t){return t.charAt(0).toUpperCase()+t.slice(1)}function je(t){return t}var Au=4,{ensureClassInitialized:fo,makeMethodMangler:yo}=Yt,Nu=8,Or=1,kt=2,ze=3,kr=1,Rr=2,en=1,bo=2,ho=Symbol("PENDING_USE"),po="/data/local/tmp",{getCurrentThreadId:nn,pointerSize:Mt}=Process,Ee={state:"empty",factories:[],loaders:null,Integer:null},q=null,ee=null,Eo=null,So=null,vo=null,wo=null,To=null,mo=null,jr=null,at=new Map,Be=class t{static _initialize(e,n){q=e,ee=n,Eo=n.flavor==="art",n.flavor==="jvm"&&(fo=$s,yo=Hs)}static _disposeAll(e){Ee.factories.forEach(n=>{n._dispose(e)})}static get(e){let n=Zu(),r=n.factories[0];if(e===null)return r;let s=n.loaders.get(e);if(s!==null){let i=r.cast(s,n.Integer);return n.factories[i.intValue()]}let o=new t;return o.loader=e,o.cacheDir=r.cacheDir,Fr(o,e),o}constructor(){this.cacheDir=po,this.codeCacheDir=po+"/dalvik-cache",this.tempFileNaming={prefix:"frida",suffix:""},this._classes={},this._classHandles=new Nt(10,Mu),this._patchedMethods=new Set,this._loader=null,this._types=[{},{}],Ee.factories.push(this)}_dispose(e){Array.from(this._patchedMethods).forEach(n=>{n.implementation=null}),this._patchedMethods.clear(),hr(),this._classHandles.dispose(e),this._classes={}}get loader(){return this._loader}set loader(e){let n=this._loader===null&&e!==null;this._loader=e,n&&Ee.state==="ready"&&this===Ee.factories[0]&&Fr(this,e)}use(e,n={}){let r=n.cache!=="skip",s=r?this._getUsedClass(e):void 0;if(s===void 0)try{let o=q.getEnv(),{_loader:i}=this,a=i!==null?ju(e,i,o):ku(e);s=this._make(e,a,o)}finally{r&&this._setUsedClass(e,s)}return s}_getUsedClass(e){let n;for(;(n=this._classes[e])===ho;)Thread.sleep(.05);return n===void 0&&(this._classes[e]=ho),n}_setUsedClass(e,n){n!==void 0?this._classes[e]=n:delete this._classes[e]}_make(e,n,r){let s=Lu(),o=Object.create(Ur.prototype,{[Symbol.for("n")]:{value:e},$n:{get(){return this[Symbol.for("n")]}},[Symbol.for("C")]:{value:s},$C:{get(){return this[Symbol.for("C")]}},[Symbol.for("w")]:{value:null,writable:!0},$w:{get(){return this[Symbol.for("w")]},set(c){this[Symbol.for("w")]=c}},[Symbol.for("_s")]:{writable:!0},$_s:{get(){return this[Symbol.for("_s")]},set(c){this[Symbol.for("_s")]=c}},[Symbol.for("c")]:{value:[null]},$c:{get(){return this[Symbol.for("c")]}},[Symbol.for("m")]:{value:new Map},$m:{get(){return this[Symbol.for("m")]}},[Symbol.for("l")]:{value:null,writable:!0},$l:{get(){return this[Symbol.for("l")]},set(c){this[Symbol.for("l")]=c}},[Symbol.for("gch")]:{value:n},$gch:{get(){return this[Symbol.for("gch")]}},[Symbol.for("f")]:{value:this},$f:{get(){return this[Symbol.for("f")]}}});s.prototype=o;let i=new s(null);o[Symbol.for("w")]=i,o.$w=i;let a=i.$borrowClassHandle(r);try{let c=a.value;fo(r,c),o.$l=We.build(c,r)}finally{a.unref(r)}return i}retain(e){let n=q.getEnv();return e.$clone(n)}cast(e,n,r){let s=q.getEnv(),o=e.$h;o===void 0&&(o=e);let i=n.$borrowClassHandle(s);try{if(!s.isInstanceOf(o,i.value))throw new Error(`Cast from '${s.getObjectClassName(o)}' to '${n.$n}' isn't possible`)}finally{i.unref(s)}let a=n.$C;return new a(o,en,s,r)}wrap(e,n,r){let s=n.$C,o=new s(e,en,r,!1);return o.$r=Script.bindWeak(o,q.makeHandleDestructor(e)),o}array(e,n){let r=q.getEnv(),s=ot(e);s!==null&&(e=s.name);let o=Mr("["+e,!1,this),i=o.toJni(n,r);return o.fromJni(i,r,!0)}registerClass(e){let n=q.getEnv(),r=[];try{let s=this.use("java.lang.Class"),o=n.javaLangReflectMethod(),i=n.vaMethod("pointer",[]),a=e.name,c=e.implements||[],l=e.superClass||this.use("java.lang.Object"),d=[],f=[],h={name:Ke(a),sourceFileName:Wu(a),superClass:Ke(l.$n),interfaces:c.map(N=>Ke(N.$n)),fields:d,methods:f},u=c.slice();c.forEach(N=>{Array.prototype.slice.call(N.class.getInterfaces()).forEach(T=>{let F=this.cast(T,s).getCanonicalName();u.push(this.use(F))})});let m=e.fields||{};Object.getOwnPropertyNames(m).forEach(N=>{let T=this._getType(m[N]);d.push([N,T.name])});let p={},g={};u.forEach(N=>{let T=N.$borrowClassHandle(n);r.push(T);let F=T.value;N.$ownMembers.filter(v=>N[v].overloads!==void 0).forEach(v=>{let U=N[v],V=U.overloads,B=V.map(G=>_o(v,G.returnType,G.argumentTypes));p[v]=[U,B,F],V.forEach((G,$)=>{let ie=B[$];g[ie]=[G,F]})})});let y=e.methods||{},O=Object.keys(y).reduce((N,T)=>{let F=y[T],v=T==="$init"?"<init>":T;return F instanceof Array?N.push(...F.map(U=>[v,U])):N.push([v,F]),N},[]),k=[];O.forEach(([N,T])=>{let F=ze,v,U,V=[],B;if(typeof T=="function"){let de=p[N];if(de!==void 0&&Array.isArray(de)){let[_e,te,he]=de;if(te.length>1)throw new Error(`More than one overload matching '${N}': signature must be specified`);delete g[te[0]];let ne=_e.overloads[0];F=ne.type,v=ne.returnType,U=ne.argumentTypes,B=T;let ue=n.toReflectedMethod(he,ne.handle,0),Oe=i(n.handle,ue,o.getGenericExceptionTypes);V=Cr(n,Oe).map(Ke),n.deleteLocalRef(Oe),n.deleteLocalRef(ue)}else v=this._getType("void"),U=[],B=T}else{if(T.isStatic&&(F=kt),v=this._getType(T.returnType||"void"),U=(T.argumentTypes||[]).map(te=>this._getType(te)),B=T.implementation,typeof B!="function")throw new Error("Expected a function implementation for method: "+N);let de=_o(N,v,U),_e=g[de];if(_e!==void 0){let[te,he]=_e;delete g[de],F=te.type,v=te.returnType,U=te.argumentTypes;let ne=n.toReflectedMethod(he,te.handle,0),ue=i(n.handle,ne,o.getGenericExceptionTypes);V=Cr(n,ue).map(Ke),n.deleteLocalRef(ue),n.deleteLocalRef(ne)}}let G=v.name,$=U.map(de=>de.name),ie="("+$.join("")+")"+G;f.push([N,G,$,V,F===kt?Nu:0]),k.push([N,ie,F,v,U,B])});let C=Object.keys(g);if(C.length>0)throw new Error("Missing implementation for: "+C.join(", "));let P=tn.fromBuffer(ao(h),this);try{P.load()}finally{P.file.delete()}let I=this.use(e.name),R=O.length;if(R>0){let N=3*Mt,T=Memory.alloc(R*N),F=[],v=[];k.forEach(([B,G,$,ie,de,_e],te)=>{let he=Memory.allocUtf8String(B),ne=Memory.allocUtf8String(G),ue=xo(B,I,$,ie,de,_e);T.add(te*N).writePointer(he),T.add(te*N+Mt).writePointer(ne),T.add(te*N+2*Mt).writePointer(ue),v.push(he,ne),F.push(ue)});let U=I.$borrowClassHandle(n);r.push(U);let V=U.value;n.registerNatives(V,T,R),n.throwIfExceptionPending(),I.$nativeMethods=F}return I}finally{r.forEach(s=>{s.unref(n)})}}choose(e,n){let r=q.getEnv(),{flavor:s}=ee;if(s==="jvm")this._chooseObjectsJvm(e,r,n);else if(s==="art"){let o=ee["art::gc::Heap::VisitObjects"]===void 0;if(o&&ee["art::gc::Heap::GetInstances"]===void 0)return this._chooseObjectsJvm(e,r,n);Me(q,r,i=>{o?this._chooseObjectsArtPreA12(e,r,i,n):this._chooseObjectsArtLegacy(e,r,i,n)})}else this._chooseObjectsDalvik(e,r,n)}_chooseObjectsJvm(e,n,r){let s=this.use(e),{jvmti:o}=ee,i=1,a=3,c=s.$borrowClassHandle(n),l=int64(c.value.toString());try{let d=new NativeCallback((y,E,O,k)=>(O.writeS64(l),i),"int",["int64","int64","pointer","pointer"]);o.iterateOverInstancesOfClass(c.value,a,d,c.value);let f=Memory.alloc(8);f.writeS64(l);let h=Memory.alloc(Au),u=Memory.alloc(Mt);o.getObjectsWithTags(1,f,h,u,NULL);let m=h.readS32(),p=u.readPointer(),g=[];for(let y=0;y!==m;y++)g.push(p.add(y*Mt).readPointer());o.deallocate(p);try{for(let y of g){let E=this.cast(y,s);if(r.onMatch(E)==="stop")break}r.onComplete()}finally{g.forEach(y=>{n.deleteLocalRef(y)})}}finally{c.unref(n)}}_chooseObjectsArtPreA12(e,n,r,s){let o=this.use(e),i=wt.$new(r,q),a,c=o.$borrowClassHandle(n);try{let h=ee["art::JavaVMExt::DecodeGlobal"](ee.vm,r,c.value);a=i.newHandle(h)}finally{c.unref(n)}let l=0,d=vt.$new();ee["art::gc::Heap::GetInstances"](ee.artHeap,i,a,l,d);let f=d.handles.map(h=>n.newGlobalRef(h));d.$delete(),i.$delete();try{for(let h of f){let u=this.cast(h,o);if(s.onMatch(u)==="stop")break}s.onComplete()}finally{f.forEach(h=>{n.deleteGlobalRef(h)})}}_chooseObjectsArtLegacy(e,n,r,s){let o=this.use(e),i=[],a=ee["art::JavaVMExt::AddGlobalRef"],c=ee.vm,l,d=o.$borrowClassHandle(n);try{l=ee["art::JavaVMExt::DecodeGlobal"](c,r,d.value).toInt32()}finally{d.unref(n)}let f=br(l,h=>{i.push(a(c,r,h))});ee["art::gc::Heap::VisitObjects"](ee.artHeap,f,NULL);try{for(let h of i){let u=this.cast(h,o);if(s.onMatch(u)==="stop")break}}finally{i.forEach(h=>{n.deleteGlobalRef(h)})}s.onComplete()}_chooseObjectsDalvik(e,n,r){let s=this.use(e);if(ee.addLocalReference===null){let i=Process.getModuleByName("libdvm.so"),a;switch(Process.arch){case"arm":a="2d e9 f0 41 05 46 15 4e 0c 46 7e 44 11 b3 43 68";break;case"ia32":a="8d 64 24 d4 89 5c 24 1c 89 74 24 20 e8 ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? 85 d2";break}Memory.scan(i.base,i.size,a,{onMatch:(c,l)=>{let d;if(Process.arch==="arm")c=c.or(1),d=new NativeFunction(c,"pointer",["pointer","pointer"]);else{let f=Memory.alloc(Process.pageSize);Memory.patchCode(f,16,h=>{let u=new X86Writer(h,{pc:f});u.putMovRegRegOffsetPtr("eax","esp",4),u.putMovRegRegOffsetPtr("edx","esp",8),u.putJmpAddress(c),u.flush()}),d=new NativeFunction(f,"pointer",["pointer","pointer"]),d._thunk=f}return ee.addLocalReference=d,q.perform(f=>{o(this,f)}),"stop"},onError(c){},onComplete(){ee.addLocalReference===null&&r.onComplete()}})}else o(this,n);function o(i,a){let{DVM_JNI_ENV_OFFSET_SELF:c}=Yt,l=a.handle.add(c).readPointer(),d,f=s.$borrowClassHandle(a);try{d=ee.dvmDecodeIndirectRef(l,f.value)}finally{f.unref(a)}let h=d.toMatchPattern(),u=ee.dvmHeapSourceGetBase(),p=ee.dvmHeapSourceGetLimit().sub(u).toInt32();Memory.scan(u,p,h,{onMatch:(g,y)=>{ee.dvmIsValidObject(g)&&q.perform(E=>{let O=E.handle.add(c).readPointer(),k,C=ee.addLocalReference(O,g);try{k=i.cast(C,s)}finally{E.deleteLocalRef(C)}if(r.onMatch(k)==="stop")return"stop"})},onError(g){},onComplete(){r.onComplete()}})}}openClassFile(e){return new tn(e,null,this)}_getType(e,n=!0){return Lr(e,n,this)}};function Lu(){return function(t,e,n,r){return Ur.call(this,t,e,n,r)}}function Ur(t,e,n,r=!0){if(t!==null)if(r){let s=n.newGlobalRef(t);this.$h=s,this.$r=Script.bindWeak(this,q.makeHandleDestructor(s))}else this.$h=t,this.$r=null;else this.$h=null,this.$r=null;return this.$t=e,new Proxy(this,So)}So={has(t,e){return e in t?!0:t.$has(e)},get(t,e,n){if(typeof e!="string"||e.startsWith("$")||e==="class")return t[e];let r=t.$find(e);return r!==null?r(n):t[e]},set(t,e,n,r){return t[e]=n,!0},ownKeys(t){return t.$list()},getOwnPropertyDescriptor(t,e){return Object.prototype.hasOwnProperty.call(t,e)?Object.getOwnPropertyDescriptor(t,e):{writable:!1,configurable:!0,enumerable:!0}}};Object.defineProperties(Ur.prototype,{[Symbol.for("new")]:{enumerable:!1,get(){return this.$getCtor("allocAndInit")}},$new:{enumerable:!0,get(){return this[Symbol.for("new")]}},[Symbol.for("alloc")]:{enumerable:!1,value(){let t=q.getEnv(),e=this.$borrowClassHandle(t);try{let n=t.allocObject(e.value);return this.$f.cast(n,this)}finally{e.unref(t)}}},$alloc:{enumerable:!0,get(){return this[Symbol.for("alloc")]}},[Symbol.for("init")]:{enumerable:!1,get(){return this.$getCtor("initOnly")}},$init:{enumerable:!0,get(){return this[Symbol.for("init")]}},[Symbol.for("dispose")]:{enumerable:!1,value(){let t=this.$r;t!==null&&(this.$r=null,Script.unbindWeak(t)),this.$h!==null&&(this.$h=void 0)}},$dispose:{enumerable:!0,get(){return this[Symbol.for("dispose")]}},[Symbol.for("clone")]:{enumerable:!1,value(t){let e=this.$C;return new e(this.$h,this.$t,t)}},$clone:{value(t){return this[Symbol.for("clone")](t)}},[Symbol.for("class")]:{enumerable:!1,get(){let t=q.getEnv(),e=this.$borrowClassHandle(t);try{let n=this.$f;return n.cast(e.value,n.use("java.lang.Class"))}finally{e.unref(t)}}},class:{enumerable:!0,get(){return this[Symbol.for("class")]}},[Symbol.for("className")]:{enumerable:!1,get(){let t=this.$h;return t===null?this.$n:q.getEnv().getObjectClassName(t)}},$className:{enumerable:!0,get(){return this[Symbol.for("className")]}},[Symbol.for("ownMembers")]:{enumerable:!1,get(){return this.$l.list()}},$ownMembers:{enumerable:!0,get(){return this[Symbol.for("ownMembers")]}},[Symbol.for("super")]:{enumerable:!1,get(){let t=q.getEnv(),e=this.$s.$C;return new e(this.$h,bo,t)}},$super:{enumerable:!0,get(){return this[Symbol.for("super")]}},[Symbol.for("s")]:{enumerable:!1,get(){let t=Object.getPrototypeOf(this),e=t.$_s;if(e===void 0){let n=q.getEnv(),r=this.$borrowClassHandle(n);try{let s=n.getSuperclass(r.value);if(s.isNull())e=null;else try{let o=n.getClassName(s),i=t.$f;if(e=i._getUsedClass(o),e===void 0)try{let a=Ou(this);e=i._make(o,a,n)}finally{i._setUsedClass(o,e)}}finally{n.deleteLocalRef(s)}}finally{r.unref(n)}t.$_s=e}return e}},$s:{get(){return this[Symbol.for("s")]}},[Symbol.for("isSameObject")]:{enumerable:!1,value(t){return q.getEnv().isSameObject(t.$h,this.$h)}},$isSameObject:{value(t){return this[Symbol.for("isSameObject")](t)}},[Symbol.for("getCtor")]:{enumerable:!1,value(t){let e=this.$c,n=e[0];if(n===null){let r=q.getEnv(),s=this.$borrowClassHandle(r);try{n=Ru(s.value,this.$w,r),e[0]=n}finally{s.unref(r)}}return n[t]}},$getCtor:{value(t){return this[Symbol.for("getCtor")](t)}},[Symbol.for("borrowClassHandle")]:{enumerable:!1,value(t){let e=this.$n,n=this.$f._classHandles,r=n.get(e);return r===void 0&&(r=new Dr(this.$gch(t),t),n.set(e,r,t)),r.ref()}},$borrowClassHandle:{value(t){return this[Symbol.for("borrowClassHandle")](t)}},[Symbol.for("copyClassHandle")]:{enumerable:!1,value(t){let e=this.$borrowClassHandle(t);try{return t.newLocalRef(e.value)}finally{e.unref(t)}}},$copyClassHandle:{value(t){return this[Symbol.for("copyClassHandle")](t)}},[Symbol.for("getHandle")]:{enumerable:!1,value(t){let e=this.$h;if(e===void 0)throw new Error("Wrapper is disposed; perhaps it was borrowed from a hook instead of calling Java.retain() to make a long-lived wrapper?");return e}},$getHandle:{value(t){return this[Symbol.for("getHandle")](t)}},[Symbol.for("list")]:{enumerable:!1,value(){let t=this.$s,e=t!==null?t.$list():[],n=this.$l;return Array.from(new Set(e.concat(n.list())))}},$list:{get(){return this[Symbol.for("list")]}},[Symbol.for("has")]:{enumerable:!1,value(t){if(this.$m.has(t)||this.$l.has(t))return!0;let r=this.$s;return!!(r!==null&&r.$has(t))}},$has:{value(t){return this[Symbol.for("has")](t)}},[Symbol.for("find")]:{enumerable:!1,value(t){let e=this.$m,n=e.get(t);if(n!==void 0)return n;let s=this.$l.find(t);if(s!==null){let i=q.getEnv(),a=this.$borrowClassHandle(i);try{n=Pu(t,s,a.value,this.$w,i)}finally{a.unref(i)}return e.set(t,n),n}let o=this.$s;return o!==null?o.$find(t):null}},$find:{value(t){return this[Symbol.for("find")](t)}},[Symbol.for("toJSON")]:{enumerable:!1,value(){let t=this.$n;if(this.$h===null)return`<class: ${t}>`;let n=this.$className;return t===n?`<instance: ${t}>`:`<instance: ${t}, $className: ${n}>`}},toJSON:{get(){return this[Symbol.for("toJSON")]}}});function Dr(t,e){this.value=e.newGlobalRef(t),e.deleteLocalRef(t),this.refs=1}Dr.prototype.ref=function(){return this.refs++,this};Dr.prototype.unref=function(t){--this.refs===0&&t.deleteGlobalRef(this.value)};function Mu(t,e){t.unref(e)}function ku(t){let e=t.replace(/\./g,"/");return function(n){let r=nn();No(r);try{return n.findClass(e)}finally{Lo(r)}}}function ju(t,e,n){return jr===null&&(mo=n.vaMethod("pointer",["pointer"]),jr=e.loadClass.overload("java.lang.String").handle),n=null,function(r){let s=r.newStringUtf(t),o=nn();No(o);try{let i=mo(r.handle,e.$h,jr,s);return r.throwIfExceptionPending(),i}finally{Lo(o),r.deleteLocalRef(s)}}}function Ou(t){return function(e){let n=t.$borrowClassHandle(e);try{return e.getSuperclass(n.value)}finally{n.unref(e)}}}function Ru(t,e,n){let{$n:r,$f:s}=e,o=qu(r),i=n.javaLangClass(),a=n.javaLangReflectConstructor(),c=n.vaMethod("pointer",[]),l=n.vaMethod("uint8",[]),d=[],f=[],h=s._getType(r,!1),u=s._getType("void",!1),m=c(n.handle,t,i.getDeclaredConstructors);try{let p=n.getArrayLength(m);if(p!==0)for(let g=0;g!==p;g++){let y,E,O=n.getObjectArrayElement(m,g);try{y=n.fromReflectedMethod(O),E=c(n.handle,O,a.getGenericParameterTypes)}finally{n.deleteLocalRef(O)}let k;try{k=Cr(n,E).map(C=>s._getType(C))}finally{n.deleteLocalRef(E)}d.push(it(o,e,Or,y,h,k,n)),f.push(it(o,e,ze,y,u,k,n))}else{if(l(n.handle,t,i.isInterface))throw new Error("cannot instantiate an interface");let y=n.javaLangObject(),E=n.getMethodId(y,"<init>","()V");d.push(it(o,e,Or,E,h,[],n)),f.push(it(o,e,ze,E,u,[],n))}}finally{n.deleteLocalRef(m)}if(f.length===0)throw new Error("no supported overloads");return{allocAndInit:Pr(d),initOnly:Pr(f)}}function Pu(t,e,n,r,s){return e.startsWith("m")?Iu(t,e,n,r,s):$u(t,e,n,r,s)}function Iu(t,e,n,r,s){let{$f:o}=r,i=e.split(":").slice(1),a=s.javaLangReflectMethod(),c=s.vaMethod("pointer",[]),l=s.vaMethod("uint8",[]),d=i.map(h=>{let u=h[0]==="s"?kt:ze,m=ptr(h.substr(1)),p,g=[],y=s.toReflectedMethod(n,m,u===kt?1:0);try{let E=!!l(s.handle,y,a.isVarArgs),O=c(s.handle,y,a.getGenericReturnType);s.throwIfExceptionPending();try{p=o._getType(s.getTypeName(O))}finally{s.deleteLocalRef(O)}let k=c(s.handle,y,a.getParameterTypes);try{let C=s.getArrayLength(k);for(let P=0;P!==C;P++){let I=s.getObjectArrayElement(k,P),R;try{R=E&&P===C-1?s.getArrayTypeName(I):s.getTypeName(I)}finally{s.deleteLocalRef(I)}let N=o._getType(R);g.push(N)}}finally{s.deleteLocalRef(k)}}catch{return null}finally{s.deleteLocalRef(y)}return it(t,r,u,m,p,g,s)}).filter(h=>h!==null);if(d.length===0)throw new Error("No supported overloads");t==="valueOf"&&Gu(d);let f=Pr(d);return function(h){return f}}function Pr(t){let e=Fu();return Object.setPrototypeOf(e,vo),e._o=t,e}function Fu(){let t=function(){return t.invoke(this,arguments)};return t}vo=Object.create(Function.prototype,{overloads:{enumerable:!0,get(){return this._o}},overload:{value(...t){let e=this._o,n=t.length,r=t.join(":");for(let s=0;s!==e.length;s++){let o=e[s],{argumentTypes:i}=o;if(i.length!==n)continue;if(i.map(c=>c.className).join(":")===r)return o}Ir(this.methodName,this.overloads,"specified argument types do not match any of:")}},methodName:{enumerable:!0,get(){return this._o[0].methodName}},holder:{enumerable:!0,get(){return this._o[0].holder}},type:{enumerable:!0,get(){return this._o[0].type}},handle:{enumerable:!0,get(){return Ye(this),this._o[0].handle}},implementation:{enumerable:!0,get(){return Ye(this),this._o[0].implementation},set(t){Ye(this),this._o[0].implementation=t}},returnType:{enumerable:!0,get(){return Ye(this),this._o[0].returnType}},argumentTypes:{enumerable:!0,get(){return Ye(this),this._o[0].argumentTypes}},canInvokeWith:{enumerable:!0,get(t){return Ye(this),this._o[0].canInvokeWith}},clone:{enumerable:!0,value(t){return Ye(this),this._o[0].clone(t)}},invoke:{value(t,e){let n=this._o,r=t.$h!==null;for(let s=0;s!==n.length;s++){let o=n[s];if(o.canInvokeWith(e)){if(o.type===ze&&!r){let i=this.methodName;if(i==="toString")return`<class: ${t.$n}>`;throw new Error(i+": cannot call instance method without an instance")}return o.apply(t,e)}}if(this.methodName==="toString")return`<class: ${t.$n}>`;Ir(this.methodName,this.overloads,"argument types do not match any of:")}}});function _o(t,e,n){return`${e.className} ${t}(${n.map(r=>r.className).join(", ")})`}function Ye(t){let e=t._o;e.length>1&&Ir(e[0].methodName,e,"has more than one overload, use .overload(<signature>) to choose from:")}function Ir(t,e,n){let s=e.slice().sort((o,i)=>o.argumentTypes.length-i.argumentTypes.length).map(o=>o.argumentTypes.length>0?".overload('"+o.argumentTypes.map(a=>a.className).join("', '")+"')":".overload()");throw new Error(`${t}(): ${n}
	${s.join(`
	`)}`)}function it(t,e,n,r,s,o,i,a){let c=s.type,l=o.map(h=>h.type);i===null&&(i=q.getEnv());let d,f;return n===ze?(d=i.vaMethod(c,l,a),f=i.nonvirtualVaMethod(c,l,a)):n===kt?(d=i.staticVaMethod(c,l,a),f=d):(d=i.constructor(l,a),f=d),Cu([t,e,n,r,s,o,d,f])}function Cu(t){let e=Uu();return Object.setPrototypeOf(e,wo),e._p=t,e}function Uu(){let t=function(){return t.invoke(this,arguments)};return t}wo=Object.create(Function.prototype,{methodName:{enumerable:!0,get(){return this._p[0]}},holder:{enumerable:!0,get(){return this._p[1]}},type:{enumerable:!0,get(){return this._p[2]}},handle:{enumerable:!0,get(){return this._p[3]}},implementation:{enumerable:!0,get(){let t=this._r;return t!==void 0?t:null},set(t){let e=this._p,n=e[1];if(e[2]===Or)throw new Error("Reimplementing $new is not possible; replace implementation of $init instead");let s=this._r;if(s!==void 0&&(n.$f._patchedMethods.delete(this),s._m.revert(q),this._r=void 0),t!==null){let[o,i,a,c,l,d]=e,f=xo(o,i,a,l,d,t,this),h=yo(c);f._m=h,this._r=f,h.replace(f,a===ze,d,q,ee),n.$f._patchedMethods.add(this)}}},returnType:{enumerable:!0,get(){return this._p[4]}},argumentTypes:{enumerable:!0,get(){return this._p[5]}},canInvokeWith:{enumerable:!0,value(t){let e=this._p[5];return t.length!==e.length?!1:e.every((n,r)=>n.isCompatible(t[r]))}},clone:{enumerable:!0,value(t){let e=this._p.slice(0,6);return it(...e,null,t)}},invoke:{value(t,e){let n=q.getEnv(),r=this._p,s=r[2],o=r[4],i=r[5],a=this._r,c=s===ze,l=e.length,d=2+l;n.pushLocalFrame(d);let f=null;try{let h;c?h=t.$getHandle():(f=t.$borrowClassHandle(n),h=f.value);let u,m=t.$t;a===void 0?u=r[3]:(u=a._m.resolveTarget(t,c,n,ee),Eo&&a._c.has(nn())&&(m=bo));let p=[n.handle,h,u];for(let E=0;E!==l;E++)p.push(i[E].toJni(e[E],n));let g;m===en?g=r[6]:(g=r[7],c&&p.splice(2,0,t.$copyClassHandle(n)));let y=g.apply(null,p);return n.throwIfExceptionPending(),o.fromJni(y,n,!0)}finally{f!==null&&f.unref(n),n.popLocalFrame(NULL)}}},toString:{enumerable:!0,value(){return`function ${this.methodName}(${this.argumentTypes.map(t=>t.className).join(", ")}): ${this.returnType.className}`}}});function xo(t,e,n,r,s,o,i=null){let a=new Set,c=Du([t,e,n,r,s,o,i,a]),l=new NativeCallback(c,r.type,["pointer","pointer"].concat(s.map(d=>d.type)));return l._c=a,l}function Du(t){return function(){return zu(arguments,t)}}function zu(t,e){let n=new b(t[0],q),[r,s,o,i,a,c,l,d]=e,f=[],h;if(o===ze){let p=s.$C;h=new p(t[1],en,n,!1)}else h=s;let u=nn();n.pushLocalFrame(3);let m=!0;q.link(u,n);try{d.add(u);let p;l===null||!at.has(u)?p=c:p=l;let g=[],y=t.length-2;for(let k=0;k!==y;k++){let P=a[k].fromJni(t[2+k],n,!1);g.push(P),f.push(P)}let E=p.apply(h,g);if(!i.isCompatible(E))throw new Error(`Implementation for ${r} expected return value compatible with ${i.className}`);let O=i.toJni(E,n);return i.type==="pointer"&&(O=n.popLocalFrame(O),m=!1,f.push(E)),O}catch(p){let g=p.$h;return g!==void 0?n.throw(g):Script.nextTick(()=>{throw p}),i.defaultValue}finally{q.unlink(u),m&&n.popLocalFrame(NULL),d.delete(u),f.forEach(p=>{if(p===null)return;let g=p.$dispose;g!==void 0&&g.call(p)})}}function Gu(t){let{holder:e,type:n}=t[0];t.some(s=>s.type===n&&s.argumentTypes.length===0)||t.push(Vu([e,n]))}function Vu(t){let e=Bu();return Object.setPrototypeOf(e,To),e._p=t,e}function Bu(){return function(){return this}}To=Object.create(Function.prototype,{methodName:{enumerable:!0,get(){return"valueOf"}},holder:{enumerable:!0,get(){return this._p[0]}},type:{enumerable:!0,get(){return this._p[1]}},handle:{enumerable:!0,get(){return NULL}},implementation:{enumerable:!0,get(){return null},set(t){}},returnType:{enumerable:!0,get(){let t=this.holder;return t.$f.use(t.$n)}},argumentTypes:{enumerable:!0,get(){return[]}},canInvokeWith:{enumerable:!0,value(t){return t.length===0}},clone:{enumerable:!0,value(t){throw new Error("Invalid operation")}}});function $u(t,e,n,r,s){let o=e[2]==="s"?kr:Rr,i=ptr(e.substr(3)),{$f:a}=r,c,l=s.toReflectedField(n,i,o===kr?1:0);try{c=s.vaMethod("pointer",[])(s.handle,l,s.javaLangReflectField().getGenericType),s.throwIfExceptionPending()}finally{s.deleteLocalRef(l)}let d;try{d=a._getType(s.getTypeName(c))}finally{s.deleteLocalRef(c)}let f,h,u=d.type;return o===kr?(f=s.getStaticField(u),h=s.setStaticField(u)):(f=s.getField(u),h=s.setField(u)),Ju([o,d,i,f,h])}function Ju(t){return function(e){return new Ao([e].concat(t))}}function Ao(t){this._p=t}Object.defineProperties(Ao.prototype,{value:{enumerable:!0,get(){let[t,e,n,r,s]=this._p,o=q.getEnv();o.pushLocalFrame(4);let i=null;try{let a;if(e===Rr){if(a=t.$getHandle(),a===null)throw new Error("Cannot access an instance field without an instance")}else i=t.$borrowClassHandle(o),a=i.value;let c=s(o.handle,a,r);return o.throwIfExceptionPending(),n.fromJni(c,o,!0)}finally{i!==null&&i.unref(o),o.popLocalFrame(NULL)}},set(t){let[e,n,r,s,,o]=this._p,i=q.getEnv();i.pushLocalFrame(4);let a=null;try{let c;if(n===Rr){if(c=e.$getHandle(),c===null)throw new Error("Cannot access an instance field without an instance")}else a=e.$borrowClassHandle(i),c=a.value;if(!r.isCompatible(t))throw new Error(`Expected value compatible with ${r.className}`);let l=r.toJni(t,i);o(i.handle,c,s,l),i.throwIfExceptionPending()}finally{a!==null&&a.unref(i),i.popLocalFrame(NULL)}}},holder:{enumerable:!0,get(){return this._p[0]}},fieldType:{enumerable:!0,get(){return this._p[1]}},fieldReturnType:{enumerable:!0,get(){return this._p[2]}},toString:{enumerable:!0,value(){let t=`Java.Field{holder: ${this.holder}, fieldType: ${this.fieldType}, fieldReturnType: ${this.fieldReturnType}, value: ${this.value}}`;return t.length<200?t:`Java.Field{
	holder: ${this.holder},
	fieldType: ${this.fieldType},
	fieldReturnType: ${this.fieldReturnType},
	value: ${this.value},
}`.split(`
`).map(n=>n.length>200?n.slice(0,n.indexOf(" ")+1)+"...,":n).join(`
`)}}});var tn=class t{static fromBuffer(e,n){let r=go(n),s=r.getCanonicalPath().toString(),o=new File(s,"w");return o.write(e.buffer),o.close(),Hu(s,n),new t(s,r,n)}constructor(e,n,r){this.path=e,this.file=n,this._factory=r}load(){let{_factory:e}=this,{codeCacheDir:n}=e,r=e.use("dalvik.system.DexClassLoader"),s=e.use("java.io.File"),o=this.file;if(o===null&&(o=e.use("java.io.File").$new(this.path)),!o.exists())throw new Error("File not found");s.$new(n).mkdirs(),e.loader=r.$new(o.getCanonicalPath(),n,null,e.loader),q.preventDetachDueToClassLoader()}getClassNames(){let{_factory:e}=this,n=e.use("dalvik.system.DexFile"),r=go(e),s=n.loadDex(this.path,r.getCanonicalPath(),0),o=[],i=s.entries();for(;i.hasMoreElements();)o.push(i.nextElement().toString());return o}};function go(t){let{cacheDir:e,tempFileNaming:n}=t,r=t.use("java.io.File"),s=r.$new(e);return s.mkdirs(),r.createTempFile(n.prefix,n.suffix+".dex",s)}function Hu(t,e){e.use("java.io.File").$new(t).setWritable(!1,!1)}function Zu(){switch(Ee.state){case"empty":{Ee.state="pending";let t=Ee.factories[0],e=t.use("java.util.HashMap"),n=t.use("java.lang.Integer");Ee.loaders=e.$new(),Ee.Integer=n;let r=t.loader;return r!==null&&Fr(t,r),Ee.state="ready",Ee}case"pending":do Thread.sleep(.05);while(Ee.state==="pending");return Ee;case"ready":return Ee}}function Fr(t,e){let{factories:n,loaders:r,Integer:s}=Ee,o=s.$new(n.indexOf(t));r.put(e,o);for(let i=e.getParent();i!==null&&!r.containsKey(i);i=i.getParent())r.put(i,o)}function No(t){let e=at.get(t);e===void 0&&(e=0),e++,at.set(t,e)}function Lo(t){let e=at.get(t);if(e===void 0)throw new Error(`Thread ${t} is not ignored`);e--,e===0?at.delete(t):at.set(t,e)}function qu(t){return t.slice(t.lastIndexOf(".")+1)}function Cr(t,e){let n=[],r=t.getArrayLength(e);for(let s=0;s!==r;s++){let o=t.getObjectArrayElement(e,s);try{n.push(t.getTypeName(o))}finally{t.deleteLocalRef(o)}}return n}function Wu(t){let e=t.split(".");return e[e.length-1]+".java"}var Ku=4,Mo=Process.pointerSize,zr=class{ACC_PUBLIC=1;ACC_PRIVATE=2;ACC_PROTECTED=4;ACC_STATIC=8;ACC_FINAL=16;ACC_SYNCHRONIZED=32;ACC_BRIDGE=64;ACC_VARARGS=128;ACC_NATIVE=256;ACC_ABSTRACT=1024;ACC_STRICT=2048;ACC_SYNTHETIC=4096;constructor(){this.classFactory=null,this.ClassFactory=Be,this.vm=null,this.api=null,this._initialized=!1,this._apiError=null,this._wakeupHandler=null,this._pollListener=null,this._pendingMainOps=[],this._pendingVmOps=[],this._cachedIsAppProcess=null;try{this._tryInitialize()}catch{}}_tryInitialize(){if(this._initialized)return!0;if(this._apiError!==null)throw this._apiError;let e;try{e=At(),this.api=e}catch(r){throw this._apiError=r,r}if(e===null)return!1;let n=new Pe(e);return this.vm=n,lo(n),Be._initialize(n,e),this.classFactory=new Be,this._initialized=!0,!0}_dispose(){if(this.api===null)return;let{vm:e}=this;e.perform(n=>{Be._disposeAll(n),b.dispose(n)}),Script.nextTick(()=>{Pe.dispose(e)})}get available(){return this._tryInitialize()}get androidVersion(){return Tt()}synchronized(e,n){let{$h:r=e}=e;if(!(r instanceof NativePointer))throw new Error("Java.synchronized: the first argument `obj` must be either a pointer or a Java instance");let s=this.vm.getEnv();be("VM::MonitorEnter",s.monitorEnter(r));try{n()}finally{s.monitorExit(r)}}enumerateLoadedClasses(e){this._checkAvailable();let{flavor:n}=this.api;n==="jvm"?this._enumerateLoadedClassesJvm(e):n==="art"?this._enumerateLoadedClassesArt(e):this._enumerateLoadedClassesDalvik(e)}enumerateLoadedClassesSync(){let e=[];return this.enumerateLoadedClasses({onMatch(n){e.push(n)},onComplete(){}}),e}enumerateClassLoaders(e){this._checkAvailable();let{flavor:n}=this.api;if(n==="jvm")this._enumerateClassLoadersJvm(e);else if(n==="art")this._enumerateClassLoadersArt(e);else throw new Error("Enumerating class loaders is not supported on Dalvik")}enumerateClassLoadersSync(){let e=[];return this.enumerateClassLoaders({onMatch(n){e.push(n)},onComplete(){}}),e}_enumerateLoadedClassesJvm(e){let{api:n,vm:r}=this,{jvmti:s}=n,o=r.getEnv(),i=Memory.alloc(Ku),a=Memory.alloc(Mo);s.getLoadedClasses(i,a);let c=i.readS32(),l=a.readPointer(),d=[];for(let f=0;f!==c;f++)d.push(l.add(f*Mo).readPointer());s.deallocate(l);try{for(let f of d){let h=o.getClassName(f);e.onMatch(h,f)}e.onComplete()}finally{d.forEach(f=>{o.deleteLocalRef(f)})}}_enumerateClassLoadersJvm(e){this.choose("java.lang.ClassLoader",e)}_enumerateLoadedClassesArt(e){let{vm:n,api:r}=this,s=n.getEnv(),o=r["art::JavaVMExt::AddGlobalRef"],{vm:i}=r;Me(n,s,a=>{let c=dr(l=>{let d=o(i,a,l);try{let f=s.getClassName(d);e.onMatch(f,d)}finally{s.deleteGlobalRef(d)}return!0});r["art::ClassLinker::VisitClasses"](r.artClassLinker.address,c)}),e.onComplete()}_enumerateClassLoadersArt(e){let{classFactory:n,vm:r,api:s}=this,o=r.getEnv(),i=s["art::ClassLinker::VisitClassLoaders"];if(i===void 0)throw new Error("This API is only available on Android >= 7.0");let a=n.use("java.lang.ClassLoader"),c=[],l=s["art::JavaVMExt::AddGlobalRef"],{vm:d}=s;Me(r,o,f=>{let h=ur(u=>(c.push(l(d,f,u)),!0));lr(()=>{i(s.artClassLinker.address,h)})});try{c.forEach(f=>{let h=n.cast(f,a);e.onMatch(h)})}finally{c.forEach(f=>{o.deleteGlobalRef(f)})}e.onComplete()}_enumerateLoadedClassesDalvik(e){let{api:n}=this,r=ptr("0xcbcacccd"),s=172,o=8,a=n.gDvm.add(s).readPointer(),c=a.readS32(),d=a.add(12).readPointer(),f=c*o;for(let h=0;h<f;h+=o){let m=d.add(h).add(4).readPointer();if(m.isNull()||m.equals(r))continue;let g=m.add(24).readPointer().readUtf8String();if(g.startsWith("L")){let y=g.substring(1,g.length-1).replace(/\//g,".");e.onMatch(y)}}e.onComplete()}enumerateMethods(e){let{classFactory:n}=this,r=this.vm.getEnv(),s=n.use("java.lang.ClassLoader");return We.enumerateMethods(e,this.api,r).map(o=>{let i=o.loader;return o.loader=i!==null?n.wrap(i,s,r):null,o})}scheduleOnMainThread(e){this.performNow(()=>{this._pendingMainOps.push(e);let{_wakeupHandler:n}=this;if(n===null){let{classFactory:r}=this,s=r.use("android.os.Handler"),o=r.use("android.os.Looper");n=s.$new(o.getMainLooper()),this._wakeupHandler=n}this._pollListener===null&&(this._pollListener=Interceptor.attach(Process.getModuleByName("libc.so").getExportByName("epoll_wait"),this._makePollHook()),Interceptor.flush()),n.sendEmptyMessage(1)})}_makePollHook(){let e=Process.id,{_pendingMainOps:n}=this;return function(){if(this.threadId!==e)return;let r;for(;(r=n.shift())!==void 0;)try{r()}catch(s){Script.nextTick(()=>{throw s})}}}perform(e){if(this._checkAvailable(),!this._isAppProcess()||this.classFactory.loader!==null)try{this.vm.perform(e)}catch(n){Script.nextTick(()=>{throw n})}else this._pendingVmOps.push(e),this._pendingVmOps.length===1&&this._performPendingVmOpsWhenReady()}performNow(e){return this._checkAvailable(),this.vm.perform(()=>{let{classFactory:n}=this;if(this._isAppProcess()&&n.loader===null){let s=n.use("android.app.ActivityThread").currentApplication();s!==null&&ko(n,s)}return e()})}_performPendingVmOpsWhenReady(){this.vm.perform(()=>{let{classFactory:e}=this,n=e.use("android.app.ActivityThread"),r=n.currentApplication();if(r!==null){ko(e,r),this._performPendingVmOps();return}let s=this,o=!1,i="early",a=n.handleBindApplication;a.implementation=function(d){if(d.instrumentationName.value!==null){i="late";let h=e.use("android.app.LoadedApk").makeApplication;h.implementation=function(u,m){return o||(o=!0,jo(e,this),s._performPendingVmOps()),h.apply(this,arguments)}}a.apply(this,arguments)};let l=n.getPackageInfo.overloads.map(d=>[d.argumentTypes.length,d]).sort(([d],[f])=>f-d).map(([d,f])=>f)[0];l.implementation=function(...d){let f=l.call(this,...d);return!o&&i==="early"&&(o=!0,jo(e,f),s._performPendingVmOps()),f}})}_performPendingVmOps(){let{vm:e,_pendingVmOps:n}=this,r;for(;(r=n.shift())!==void 0;)try{e.perform(r)}catch(s){Script.nextTick(()=>{throw s})}}use(e,n){return this.classFactory.use(e,n)}openClassFile(e){return this.classFactory.openClassFile(e)}choose(e,n){this.classFactory.choose(e,n)}retain(e){return this.classFactory.retain(e)}cast(e,n){return this.classFactory.cast(e,n)}array(e,n){return this.classFactory.array(e,n)}backtrace(e){return fr(this.vm,e)}isMainThread(){let e=this.classFactory.use("android.os.Looper"),n=e.getMainLooper(),r=e.myLooper();return r===null?!1:n.$isSameObject(r)}registerClass(e){return this.classFactory.registerClass(e)}deoptimizeEverything(){let{vm:e}=this;return _r(e,e.getEnv())}deoptimizeBootImage(){let{vm:e}=this;return gr(e,e.getEnv())}deoptimizeMethod(e){let{vm:n}=this;return mr(n,n.getEnv(),e)}_checkAvailable(){if(!this.available)throw new Error("Java API not available")}_isAppProcess(){let e=this._cachedIsAppProcess;if(e===null){if(this.api.flavor==="jvm")return e=!1,this._cachedIsAppProcess=e,e;let n=new NativeFunction(Module.getGlobalExportByName("readlink"),"pointer",["pointer","pointer","pointer"],{exceptions:"propagate"}),r=Memory.allocUtf8String("/proc/self/exe"),s=1024,o=Memory.alloc(s),i=n(r,o,ptr(s)).toInt32();if(i!==-1){let a=o.readUtf8String(i);e=/^\/system\/bin\/app_process/.test(a)}else e=!0;this._cachedIsAppProcess=e}return e}};function ko(t,e){let n=t.use("android.os.Process");t.loader=e.getClassLoader(),n.myUid()===n.SYSTEM_UID.value?(t.cacheDir="/data/system",t.codeCacheDir="/data/dalvik-cache"):"getCodeCacheDir"in e?(t.cacheDir=e.getCacheDir().getCanonicalPath(),t.codeCacheDir=e.getCodeCacheDir().getCanonicalPath()):(t.cacheDir=e.getFilesDir().getCanonicalPath(),t.codeCacheDir=e.getCacheDir().getCanonicalPath())}function jo(t,e){let n=t.use("java.io.File");t.loader=e.getClassLoader();let r=n.$new(e.getDataDir()).getCanonicalPath();t.cacheDir=r,t.codeCacheDir=r+"/cache"}var Gr=new zr;Script.bindWeak(Gr,()=>{Gr._dispose()});var Vr=Gr;var Br=Vr;globalThis.FRIDA_JAVA_BRIDGE_DISABLE_JVMTI=!0;var ct="J0.a",Oo=null;function Yu(t){for(let e of Br.enumerateClassLoadersSync())try{return Br.ClassFactory.get(e).use(t)}catch{}return null}function Qu(t){try{let e=t.class.getDeclaredMethods();console.log("    [debug] methods("+t.$className+"): "+e.length)}catch{}}Br.perform(function(){console.log("[*] FKIAB boolean-state bypass (target: "+ct+")");let t=Yu(ct);if(!t){console.log("[-] Gate class not found at runtime: "+ct);return}Qu(t);let e=t.class.getDeclaredMethods(),n=null;for(let s=0;s<e.length;s++){let o=e[s];if(o.getReturnType().getName()==="boolean")if(Oo){if(o.getName()===Oo){n=o;break}}else{n=o;break}}if(!n){console.log("[-] No boolean method found in "+ct);return}let r=t[n.getName()].overloads;for(let s=0;s<r.length;s++){let o=r[s];o.implementation=function(){return console.log("[+] Forced "+ct+"#"+n.getName()+"() -> true"),!0}}console.log("[+] Hooked boolean state method: "+ct+"#"+n.getName())});})();
