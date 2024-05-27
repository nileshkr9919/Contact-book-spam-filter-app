import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import {User} from '../user/user.model';

@Table
export class Contact extends Model<Contact> {
  @Column({
    allowNull: false,
  })
  name: string;

  @Column({
    allowNull: false,
    unique: true,
  })
  phoneNumber: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
