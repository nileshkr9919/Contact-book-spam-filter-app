import {
  Table,
  Column,
  Model,
  DataType,
  BeforeCreate,
  HasOne,
  HasMany,
} from 'sequelize-typescript';
import {compare, hash} from 'bcrypt';
import {Spam} from '../spam/spam.model';
import {Contact} from '../contact/contact.model';
import {ApiProperty} from '@nestjs/swagger';

@Table
export class User extends Model<User> {
  @ApiProperty({description: 'The name of the user'})
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({description: 'The phone number of the user'})
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  phoneNumber: string;

  @ApiProperty({description: 'The email of the user'})
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: true,
  })
  email: string;

  @ApiProperty({description: 'The password of the user'})
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @BeforeCreate
  static async hashPassword(user: User) {
    user.password = await hash(user.password, 10);
  }

  async validatePassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }

  @HasOne(() => Spam)
  spam: Spam;

  @HasMany(() => Contact)
  contacts: Contact[];
}
