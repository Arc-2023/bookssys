<!---底部栏--->
<template>
    <div id="bottomBar">
      <span class="ShortSentences" style="text-align:center; left:41% " >{{ saying}} --- {{writer}}</span>
    </div>
</template>
<script>
import axios from 'axios';
export default {
  data () {
    return {
      saying:"",
      writer:"",
    }
  },
  mounted(){
  this.getsaying()
  },
  methods:{
    getsaying(){
      console.log("一言请求")
      axios.get('https://v1.hitokoto.cn/?c=d&c=i').then((res) => {
        console.log("句子",res.data.hitokoto)
        this.saying=res.data.hitokoto
        if(res.data.from_who==null){
          this.writer="佚名"
        }
        else{
        this.writer=res.data.from_who}
        console.log("作者1",res.data.from_who)
        console.log("作者2",this.writer)
      })
    }
  }  
}
</script>
<style scoped>
#bottomBar {
  display: flex;
  position: fixed;
  width: 100%;
  height: 50px;
  bottom: 0px;
  background-color: black;
}
.copyright {
  color: aliceblue;
  font-size: 24px;
  position: relative;
  top: 30px;
  left: 50%;
  transform: translate(-50%, -50%);
}
.ShortSentences {
  position: relative;
  color: aliceblue;
  font-size: 20px;
  top: 10px;
  left: 70%;
}
</style>
