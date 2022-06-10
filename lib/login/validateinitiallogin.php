<?php
    include('../dbconfig.php');
    include('../config.php');

    //start new session
    session_start();

    //test if form data is set
    //if form data is not set propperly, return to login page
    //set session message
    if(!isset($_POST['username'], $_POST['password'])){
        $_SESSION['msg'] = "missing username/password";
        die(header("location: http:// . $ip . /mcs/login.php"));
    }

    //fill variables with form data
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    //check if user exists in database
    $sql = $dbconnection->prepare("SELECT * FROM user WHERE username = :username");
    $sql->bindParam(':username', $username);
    $sql->execute();
    $result = $sql->fetch(PDO::FETCH_ASSOC);
    
    //if a user was found check if password is matching
    //if matching password generate new session id
    //set user logged in = true
    //set session user name
    //set user id
    //forward user to pickstage site
    //if password is not matching send back to login with error message
    //if no matching user was found send back to login
    if(count($result) > 0){
        if(password_verify($_POST['password'], $result['userpassword'])){
            session_regenerate_id();
            $_SESSION['loggedin'] = TRUE;
            $_SESSION['username'] = $username;
            die(header("location: http://" . $ip . "/mcs/administration.php"));
        }else{
            $_SESSION['msg'] = "invalid password";
            die(header("location: http://" . $ip . "/mcs/login.php"));    
        }
    }else{
        $_SESSION['msg'] = "no matching user";
        die(header("location: http://" . $ip . "/mcs/login.php"));
    }
    
?>
