<template>
    <div class="container" >
        <div class="row">
            <div class="col-sm-6 col-md-4 col-md-offset-4">
                <div class="account-wall">
                   <h1 class="text-center login-title">プロ・レス会計  ログイン</h1>

                    <img style="border: 1px solid #337ab7;" class="profile-img text-center" src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120" alt="">
                    
                    <form class="form-signin"  method="post" action="" >
              					
                        <input type="text"  name="username" value=""  placeholder="ユーザー名" class="form-control" required autofocus >
              					
                        <input type="password"  name="password" value=""  placeholder="パスワード" class="form-control" required>
              					
              					
                        <nuxt-link class="btn btn-lg btn-primary btn-block" to="/register">ログイン</nuxt-link>

                        <nuxt-link class="btn btn-lg btn-info btn-block" to="/register">新規登録</nuxt-link>
              					
                    </form>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
 layout : 'loginlayout',

 head(){
     return {
         title : 'プロ・レス会計  ログイン'
     }
 }
}
</script>
