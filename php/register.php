<?php

$shoujihao = $_POST['shoujihao'];
$password = $_POST['password'];
$nickname = $_POST['nickname'];

$sql = "INSERT INTO `users`VALUES ('null','$shoujihao','$password','$nickname')";

$link = mysqli_connect('127.0.0.1','root','root','mine');

$res = mysqli_query($link,$sql);

mysqli_close($link);

if($res){
    $arr = array(
        "message" => "成功",
        "code" => 1,
        "nickname"=> $nickname
    );
    echo json_encode($arr);
}else{
    $arr = array(
        "message" => "失败",
        "code" => 0,
    );
    echo json_encode($arr);
};

?>