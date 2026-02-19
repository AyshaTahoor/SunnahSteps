import { Schema, model, models, Document, Types } from 'mongoose';

export interface IArticle extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  author: Types.ObjectId | {
    _id: string;
    name: string;
    email?: string;
  };
  readTime: number;
  tags: string[];
  views: number;
  published: boolean;
  featured: boolean;
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
      enum: ['Aqeedah', 'Fiqh', 'Seerah', 'Tafseer', 'Hadith', 'Islamic History', 'Contemporary Issues', 'Spirituality'],
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
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-populate author
ArticleSchema.pre('find', function () {
  this.populate({ path: 'author', select: 'name email' });
});
ArticleSchema.pre('findOne', function () {
  this.populate({ path: 'author', select: 'name email' });
});
ArticleSchema.pre('findOneAndUpdate', function () {
  this.populate({ path: 'author', select: 'name email' });
});

export default models.Article || model<IArticle>('Article', ArticleSchema);