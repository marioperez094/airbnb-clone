module Api
  class BookingsController < ApplicationController
    def create
      if !current_user
        return render json: { error: 'user not logged in' }, status: :unauthorized
      end

      user = current_user

      property = Property.find_by(id: params[:booking][:property_id])
      return render json: { error: 'cannot find property' }, status: :not_found if !property

      begin
        @booking = Booking.create({ user_id: user.id, property_id: property.id, start_date: params[:booking][:start_date], end_date: params[:booking][:end_date]})
        render 'api/bookings/create', status: :created
      rescue ArgumentError => e
        render json: { error: e.message }, status: :bad_request
      end
    end

    def index
      @bookings = Booking.order(created_at: :desc)
      render 'api/bookings/index', status: :ok
    end

    def index_by_user
      user = User.find_by(username: params[:username])
      return render json: { error: 'cannot find user' }, status: :not_found if !user

      @bookings = user.bookings
      render 'api/bookings/index'
    end

    def show 
      @booking = Booking.find_by(id: params[:id])
      return render json: { error: 'not_found' }, status: :not_found if !@booking

      render 'api/bookings/show', status: :ok
    end

    def get_property_bookings
      property = Property.find_by(id: params[:id])
      return render json: { error: 'cannot find property' }, status: :not_found if !property

      @bookings = property.bookings.where("end_date > ? ", Date.today)
      render 'api/bookings/index'
    end

    private

    def booking_params
      params.require(:booking).permit(:property_id, :start_date, :end_date)
    end
  end
end