class StaticPagesController < ApplicationController
  def home
    render 'home'
  end

  def property
    @data = { property_id: params[:id] }.to_json
    render 'property'
  end

  def user
    @data = { username: params[:username] }.to_json
    render 'user'
  end

  def login
    render 'login'
  end

  def success
    @data = { booking_id: params[:id]}.to_json
    render 'success'
  end

  def my_properties
    render 'my_properties'
  end

  def new_property
    render 'new_property'
  end

  def update_properties
    @data = { property_id: params[:id] }.to_json
    render 'update_properties'
  end
end
