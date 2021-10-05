<template>
  <div>
    <nuxt />
  </div>
</template>
<script>
export default {
 layout : 'loginlayout',

 head(){
     return {
         title : 'プロ・レス会計  ログイン',
         script :[
           { src: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'},
          
         ],
         link :[
           { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'}
         ]

     }
 }
}
</script>
