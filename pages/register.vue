<template>
    <div class="container" >
    <div class="row" >
                <div class="col-sm-6 col-md-4 col-md-offset-4">
                
                <div class="account-wall">
                    
                    <h1 class="text-center login-title">新規登録</h1>
                    <img class="profile-img " src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120" alt="">
            
                    <form class="form-signin">
                        <input type="text" class="form-control" placeholder="ID" required autofocus>
                        <input type="password"  class="form-control" placeholder="パスワード" required>
                        
                        <nuxt-link class="btn btn-lg btn-info btn-block" to="/">登録</nuxt-link>
                        <nuxt-link class="btn btn-lg btn-danger btn-block" to="/">戻る</nuxt-link>
                        
                        
                    </form>
                </div>

                </div>
            </div>
    </div>
</template>

<script>
export default {
  layout: 'loginlayout',
  head(){
     return {
         title : '新規登録'
     }
 }
}
</script>
