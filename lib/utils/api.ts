import { NextResponse } from 'next/server';

export const successResponse = (data: any, status = 200) => {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status }
  );
};

export const errorResponse = (message: string, status = 400) => {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status }
  );
};




/*# ✅ **CHECKPOINT: Your Project Structure**

Your project should now look like this:
```
sunnah-steps-initiative/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   ├── articles/
│   │   ├── quizzes/
│   │   └── questions/
│   ├── articles/
│   ├── quizzes/
│   ├── qa/
│   └── dashboard/
├── components/
│   ├── ui/
│   ├── layout/
│   ├── auth/
│   ├── articles/
│   ├── quizzes/
│   └── qa/
├── lib/
│   ├── db/
│   │   └── mongodb.ts ✅
│   ├── models/
│   │   ├── User.ts ✅
│   │   ├── Article.ts ✅
│   │   ├── Quiz.ts ✅
│   │   └── Question.ts ✅
│   └── utils/
│       ├── auth.ts ✅
│       └── api.ts ✅
├── types/
│   └── mongoose.d.ts ✅
├── public/
│   ├── images/
│   └── icons/
└── .env.local */