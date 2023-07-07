CREATE TABLE profiles (
  profile_id UUID PRIMARY KEY DEFAULT gen_random_uuid(), 
  user_id UUID REFERENCES auth.users NOT NULL,
  username TEXT,
  full_name TEXT,
  bio TEXT,
  location TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL ,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  FOREIGN KEY (username) REFERENCES auth.users
);
alter table profiles enable row level security;
create policy "Individuals can create profiles." on profiles for
    insert with check (auth.uid() = user_id);
create policy "Individuals can view their own profiles. " on profiles for
    select using (auth.uid() = user_id);
create policy "Individuals can update their own profiles." on profiles for
    update using (auth.uid() = user_id);
create policy "Individuals can delete their own profiles." on profiles for
    delete using (auth.uid() = user_id);