-- Create the chat-files bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('chat-files', 'Chat Files', true)
ON CONFLICT (id) DO NOTHING;

-- Make sure RLS is enabled
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows public uploads to the chat-files bucket
CREATE POLICY "Allow public uploads to chat-files"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'chat-files');

-- Create a policy that allows public reads from the chat-files bucket
CREATE POLICY "Allow public reads from chat-files"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'chat-files'); 