import mongoose, { Schema, model, models } from 'mongoose';

export interface IAnswer {
  user: mongoose.Types.ObjectId;
  content: string;
  votes: number;
  accepted: boolean;
  createdAt: Date;
}

export interface IQuestion {
  _id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  askedBy: mongoose.Types.ObjectId;
  answers: IAnswer[];
  votes: number;
  views: number;
  status: 'open' | 'answered' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

const QuestionSchema = new Schema<IQuestion>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
    },
    content: {
      type: String,
      required: [true, 'Please provide content'],
    },
    category: {
      type: String,
      required: true,
    },
    tags: [{
      type: String,
    }],
    askedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    answers: [{
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      votes: {
        type: Number,
        default: 0,
      },
      accepted: {
        type: Boolean,
        default: false,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    }],
    votes: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['open', 'answered', 'closed'],
      default: 'open',
    },
  },
  {
    timestamps: true,
  }
);

export default models.Question || model<IQuestion>('Question', QuestionSchema);