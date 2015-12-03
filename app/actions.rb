# Homepage (Root path)
helpers do
end

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
    halt 400
  end
end

delete '/contacts/:id' do
  contact = Contact.find(params[:id])
  if contact.destroy
    contact.to_json
  else
    halt 400
  end
end

put '/contacts/:id' do
  contact = Contact.find(params[:id])
  if contact.update(request.params)
    contact.to_json
  else
    halt 400
  end
end