<%@ page import="java.awt.*" %>
<%@ page import="java.util.Random" %>
<%@ page import="java.awt.image.BufferedImage" %>
<%@ page import="javax.imageio.ImageIO" %>
<%@ page contentType="image/jpeg;charset=UTF-8" language="java" %>


<%!
    //随机产生颜色
     public Color getColor(){
         Random ran = new Random();
         int r = ran.nextInt(256);
         int g = ran.nextInt(256);
         int b = ran.nextInt(256);
         return new Color(r,g,b);//R G B   0-255
     }

     //产生四位验证码值
     public String getNum(){
        int ran =  (int) (Math.random()*9000)+1000;//1000-9999
        return String.valueOf(ran);
     }

%>
<%
    //因为有时候为了方便，一般图片视频会缓存在本地，下次访问就无需下载，但是我们
    //需要的验证码是一直变的，所以要禁止缓存
    response.setHeader("Pragma","no-cache");
    response.setHeader("Cache-Control","no-cache");
    response.setHeader("Expires","0");

    //绘制验证码开始
    //首先要有背景
    BufferedImage image = new BufferedImage(80,30,BufferedImage.TYPE_INT_RGB);

    //画画需要画笔
    Graphics graphics = image.getGraphics();
    //设置要画的范围(起点坐标和延申的长度)
    graphics.fillRect(0,0,80,30);
    //绘制验证码

    String checkCode = getNum();//取出四个数字
    //先设置画笔颜色和字体
    graphics.setColor(Color.BLACK);
    graphics.setFont(new Font("seif",Font.BOLD,15));
    for (int i = 0; i <checkCode.length() ; i++) {
       String s = String.valueOf(checkCode.charAt(i));//取出每一个数字
        if(i==0) {

            Random ran = new Random();
            int x = ran.nextInt(11);//0-10
            int y = ran.nextInt(21)+10;//0-20
            graphics.drawString(s, x, y);
        }else if(i==1){
            Random ran = new Random();
            int x = ran.nextInt(11)+20;//20-30
            int y = ran.nextInt(21)+10;//0-20
            graphics.drawString(s, x, y);
        }else if(i==2){
            Random ran = new Random();
            int x = ran.nextInt(11)+40;//40-50
            int y = ran.nextInt(21)+10;//0-20
            graphics.drawString(s, x, y);
        }else{
            Random ran = new Random();
            int x = ran.nextInt(11)+60;//60-70
            int y = ran.nextInt(21)+10;//0-20
            graphics.drawString(s, x, y);
        }
    }
    //将验证码真实值先保存在session中供比较
    session.setAttribute("CHECKCODE",checkCode);


    //绘制干扰线条(20条)
    for (int i = 0; i <20 ; i++) {
        //每一条需要随机的两个点的坐标
        Random ran = new Random();
        int xBegin =  ran.nextInt(80);
        int yBegin = ran.nextInt(30);
        int xEnd = ran.nextInt(xBegin+10);
        int yEnd = ran.nextInt(yBegin+10);
        //线条要随机颜色(设置画笔随机颜色)
        graphics.setColor(getColor());
        //画线条
        graphics.drawLine(xBegin,yBegin,xEnd,yEnd);
    }

    //画完辽来产生图片
     ImageIO.write(image,"jpeg",response.getOutputStream());
    //画完关闭资源
    out.clear();
    out = pageContext.pushBody();//如果你要把自制图片放进input中的src里面，必须加在这句

%>