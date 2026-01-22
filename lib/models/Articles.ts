import mongoose, { Schema, model, models } from 'mongoose';

export interface IArticle {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  author: mongoose.Types.ObjectId;
  readTime: number;
  tags: string[];
  views: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema = new Schema<IArticle>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    excerpt: {
      type: String,
      required: [true, 'Please provide an excerpt'],
      maxlength: [500, 'Excerpt cannot be more than 500 characters'],
    },
    content: {
      type: String,
      required: [true, 'Please provide content'],
    },
    category: {
      type: String,
      required: true,
      enum: ['Aqeedah', 'Fiqh', 'Seerah', 'Tafseer', 'Hadith', 'Islamic History', 'Contemporary Issues'],
    },
    image: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    readTime: {
      type: Number,
      default: 5,
    },
    tags: [{
      type: String,
    }],
    views: {
      type: Number,
      default: 0,
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Article || model<IArticle>('Article', ArticleSchema);