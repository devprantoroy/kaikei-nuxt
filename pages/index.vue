<template>
    <div class="container" >
        <div class="row">
            <div class="col-sm-6 col-md-4 col-md-offset-4">
                <div class="account-wall">
                    
                   <h1 class="text-center login-title">プロ・レス会計  ログイン</h1>

                    <img style="border: 1px solid #337ab7;" class="profile-img" src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120" alt="">
                    
                    <form class="form-signin"  method="post" action="" >
              					
                        <input type="text"  name="username" value=""  placeholder="ユーザー名" class="form-control" required autofocus >
              					
                        <input type="password"  name="password" value=""  placeholder="パスワード" class="form-control" required>
              					
              					<button id="login" class="btn btn-lg btn-primary btn-block" type="submit">ログイン</button>
              					<a id="signup_btn" class="btn btn-lg btn-info btn-block" >新規登録</a>
                    </form>
                </div>
            </div>
        </div>


         
        <div class="row" :style="{ display : 'none'}" style="display: none;">
            <div class="col-sm-6 col-md-4 col-md-offset-4">
            
            <div class="account-wall">
                
                <h1 class="text-center login-title">新規登録</h1>
                <img class="profile-img" src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120" alt="">
        
                <form class="form-signin">
                    <input type="text" class="form-control" placeholder="ID" required autofocus>
                    <input type="password"  class="form-control" placeholder="パスワード" required>
                    
                    <a id="signup_conf" class="btn btn-lg btn-info btn-block" >登録</a>
                    <a id="sign_up_exit_btn" class="btn btn-lg btn-danger btn-block" >戻る</a>
                    
                </form>
            </div>

            </div>
        </div>
    
    </div>
     






   
</template>

<script>
export default {
 layout : 'loginlayout',
 build: {
        extractCSS: {
            allChunks: true
        }
    }
}
</script>
