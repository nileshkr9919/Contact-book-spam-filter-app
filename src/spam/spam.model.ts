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
export class Spam extends Model<Spam> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phoneNumber: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isSpam: boolean;

  @Column({
    type: DataType.INTEGER,
  })
  count: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
