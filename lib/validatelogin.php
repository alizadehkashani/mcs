<?php
    session_start();

    include("config.php");


    if($_SESSION['loggedin'] != TRUE){
        die(header("location: http://" . $ip ."/memeoff/login.php"));
    }
?>