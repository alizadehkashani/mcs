<?php
    session_start();
      
   if(isset($_SESSION['msg'])){
       $msg = $_SESSION['msg'];
   }else{
       $msg = "";
   }
?>

<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" type="text/css" href="lib/mcs.css"></script>
        <link rel="stylesheet" type="text/css" href="lib/login/login.css"></script>
        <script src="lib/mcs.js"></script>
        <title>MCS - Login</title>        
    </head>
    <body>
        <div id="mainContainer">
            <div id="container">
                <div id="header"></div>
                <div id="formDIV">  
                    <form id="loginForm" action="lib/login/validateLogin.php" method="post">                        
                        <img src="lib/login/assets/user.png"></img>
                        <input type="text" name="username" required>
                        <img src="lib/login/assets/lock.png"></img>
                        <input type="password" name="password" required>      
                        <label></label>
                        <input type="submit" value="Log In" id="loginButton">  
                        <label></label>
                        <p id="errorMessage"><?php echo($msg); ?></p>         
                    </form>
                </div>
            </div>
        </div>
    </body>
</html>