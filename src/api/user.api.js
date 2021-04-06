import api from './api.js';

class UserService {
  getCurrentUser() {
    return api.httpGET('/api/auth/user')
  }

  getAvatar(id) {
    return api.httpGETAvatar('/api/auth/getAvatar/' + id);
  }

  getImageNoValidation(mobile, imageName) {
    return api.httpGETAvatarNoValidation('/api/auth/getImage/' + mobile + "/" + imageName);
  }

  getImage(mobile, imageName) {
    return api.httpGETAvatar('/api/auth/getImage/' + mobile + "/" + imageName);
  }

  getImageFileNamesNoValidation(isMobile) {
    return api.httpGETNoValidation('/api/auth/getImageFileNames/' + isMobile);
  }
  
  getImageFileNames(isMobile) {
    return api.httpGET('/api/auth/getImageFileNames/' + isMobile);
  }

  editUser(userEditRequest) {
    return api.httpPUT('/api/auth/editUser/', userEditRequest);
  }

  editUserPassword(editUserPasswordRequest) {
    return api.httpPATCH('/api/auth/changePassword', editUserPasswordRequest);
  }

  getCurrentUserAvatar() {
    return api.httpGETAvatar('/api/auth/getCurrentUserAvatar');
  }

  saveAvatar(fd) {
    return api.httpPOST('/api/auth/editAvatar', fd);
  }

  deleteAvatar() {
    return api.httpDELETE('/api/auth/deleteAvatar');
  }
}

const userService = new UserService();
export default userService;