create table if not exists public.class_gift_board (
	id text primary key check (id = 'class-1c'),
	students jsonb not null,
	updated_at timestamptz not null default now()
);

alter table public.class_gift_board enable row level security;

grant select on public.class_gift_board to anon, authenticated;
grant insert, update on public.class_gift_board to authenticated;

drop policy if exists "Anyone can view the class board" on public.class_gift_board;
create policy "Anyone can view the class board"
	on public.class_gift_board for select
	using (true);

drop policy if exists "Signed-in teachers can create the board" on public.class_gift_board;
create policy "Signed-in teachers can create the board"
	on public.class_gift_board for insert to authenticated
	with check (id = 'class-1c');

drop policy if exists "Signed-in teachers can update the board" on public.class_gift_board;
create policy "Signed-in teachers can update the board"
	on public.class_gift_board for update to authenticated
	using (id = 'class-1c')
	with check (id = 'class-1c');

do $$
begin
	if not exists (
		select 1
		from pg_publication_tables
		where pubname = 'supabase_realtime'
			and schemaname = 'public'
			and tablename = 'class_gift_board'
	) then
		alter publication supabase_realtime add table public.class_gift_board;
	end if;
end
$$;
