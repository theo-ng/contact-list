# Homepage (Root path)
get '/' do
  erb :index
end

get '/contacts' do
  Contact.all.order(:id).to_json
end

post '/contacts/new' do
  contact = Contact.new(params)
  if contact.save
    contact.to_json
  else
    halt(500)
  end
end