$(document).ready(function () {
    var socket = io("http://localhost:3000");
    var lisUserOnline = $('.lisUserOnline');
    var logout = $('#logout');
    var btnSend = $('#btnSend');
    var valSend = $('#valSend');
    var listMessage = $('.listMessage');
    $('.home').hide();
    $('.login').show();

    // click login
    $('#login_m').click((e)=>{
        // gửi user cho serve để kiểm tra trùng, nếu ko trùng thì hiển thị màn hình message
        if($('#name').val()){
            socket.emit('client-send-Username', $('#name').val());
        }else{
            alert('Vui lòng nhập username');
        }
    });

    // lắng nghe sự kiện thông báo 
    socket.on('server-send-dki-thatbai', (data)=>{
        alert(data.messge);
    });

    //lắng nghe danh sách user thay đổi
    socket.on('server-send-danhsach-Users', (data)=>{
        // data.listUser
        lisUserOnline.html('');
        data.listUser.forEach(item => {
            lisUserOnline.append(itemUserOnline(item));
        });
    });

    //lắng nge sự kiện đăng ký thành công
    socket.on('server-send-dki-thanhcong', (data)=>{
        $('#nameMe').text(data.user);
        $('.login').hide();
        $('.home').show();
    });

    // logout
    logout.click(()=>{
        socket.emit('logout');
        location.reload();
    });

    btnSend.click(()=>{
        if(valSend.val()){
            socket.emit('client-send-messge', valSend.val());
            valSend.val('');
        }
    });

    // nhận messge
    socket.on('server-send-messge-to-me',(data)=>{
        listMessage.append(itemMessageToMe(data.user , data.message));
    });
    socket.on('server-send-messge-broadcast',(data)=>{
        listMessage.append(itemMessgeBroadcast(data.user , data.message));
    });




    // nhấn vào input gửi 
    $('#valSend').focusin((e)=>{
        socket.emit('typing');
    });
    socket.on('server-send-typing', (data)=>{
        if(data.listUserTyping.length !=0){
            var html = '<img width="40px;" src="LoadEllipsis.gif" alt="">';
            data.listUserTyping.forEach(item => {
                html += item + ', ';
            });
            html+= 'đang gõ chữ';
            $('#typing').html(html);
            $('#typing').show();
        }else{
            $('#typing').hide();
        }
        
    });
 
    $('#valSend').focusout((e)=>{
        socket.emit('typing-close');
    });

    function itemUserOnline(userName) {
        return  `<li class="clearfix">
        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="avatar">
            <div class="about">
                <div class="name">${userName}</div>
                <div class="status"> <i class="fa fa-circle online"></i> online </div>
            </div>
        </li>`;
    }

    function itemMessageToMe(username, message) {
       return ` <li class="clearfix">
                    <div class="message-data text-right">
                        <span class="message-data-time">${username}</span>
                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar">
                    </div>
                    <div class="message other-message float-right">${message}</div>
                </li>`;
    }
    function itemMessgeBroadcast(username, message) {
        return `<li class="clearfix">
                    <div class="message-data">
                        <span class="message-data-time">${username}</span>
                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar">
                    </div>
                    <div class="message my-message">${message}</div>
                </li>`;
    }
});