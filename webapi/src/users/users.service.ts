import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto, UserUpdateDto } from 'src/dto/users.dto';
import { User, UserDocument } from 'src/models/users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  getUsers() {
    return this.userModel.find();
  }
  getOneUser(id: string) {
    return this.userModel.findById(id);
  }
  addUser(body: UserDto) {
    return this.userModel.create(body);
  }
  deleteUser(id) {
    return this.userModel.findByIdAndDelete(id);
  }
  updateUser(id: string, body: UserUpdateDto) {
    return this.userModel.findByIdAndUpdate(
      id,
      { $set: { ...body } },
      { new: true },
    );
  }
  search(key: string) {
    const keyWord = key
      ? {
          $or: [
            { fullName: { $regex: key, $options: 'i' } },
            { email: { $regex: key, $options: 'i' } },
          ],
        }
      : {};
    return this.userModel.find(keyWord);
  }
}
