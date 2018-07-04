Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  scope '/' do
    post '/getreplies' => 'skit_reply#getreply'
    post '/addreply' => 'skit_reply#addreply'
    delete '/remreply' => 'skit_reply#remreply'
  end
end
