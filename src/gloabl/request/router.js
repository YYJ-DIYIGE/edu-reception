const PREFIX = " http://localhost:7001";
export default {
  sms_login: `${PREFIX}/sms/login`,
  sms_send: `${PREFIX}/sms/send`,
  wachat: `${PREFIX}/wachat`, //登录
  qiniuToken: `${PREFIX}/qiniu-uploadtoken`, //七牛
  user: id => `${PREFIX}/user/${id}`,
  userbind: id => `${PREFIX}/user/bind/${id}`,
  wachatbind: id => `${PREFIX}/wachat/bind/${id}`, //绑定
  indexAdvert: `${PREFIX}/index/advertise`,
  indexCourse: `${PREFIX}/index/course`,
  zhiye: `${PREFIX}/zhiyeShow`,
  zhiyeId: id => `${PREFIX}/zhiye/${id}`,
  zhiyePath: `${PREFIX}/zhiyePath`, //职业路径
  courseId: id => `${PREFIX}/course/${id}`, //课程
  chapters: `${PREFIX}/chapters`,
  skill: `${PREFIX}/skill`,
  skillId: id => `${PREFIX}/skill/${id}`
};
