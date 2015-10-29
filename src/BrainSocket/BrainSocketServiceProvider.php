<?php
namespace BrainSocket;

use Illuminate\Support\ServiceProvider;
use Illuminate\Broadcasting\BroadcastManager;

class BrainSocketServiceProvider extends ServiceProvider {

	/**
	 * Indicates if loading of the provider is deferred.
	 *
	 * @var bool
	 */
	protected $defer = false;

	/**
	 * Bootstrap the application events.
	 *
	 * @return void
	 */
	public function boot(BroadcastManager $broadcastManager)
	{
		$broadcastManager->extend('brain_socket',function(){
			return new BrainSocketBroadcaster($this->app->make('brain_socket'));
		});
		
		 $this->publishes([
        	__DIR__.'../Assets/js/' => public_path('vendor/brain_socket/'),
    	]);
	}

	/**
	 * Register the service provider.
	 *
	 * @return void
	 */
	public function register()
	{

		$this->app['brain_socket'] = $this->app->share(function($app){
			return new BrainSocketAppResponse();
		});

		$this->app['command.brainsocket.start'] = $this->app->share(function($app)
		{
			return new BrainSocket();
		});
		$this->commands('command.brainsocket.start');
	}


	/**
	 * Get the services provided by the provider.
	 *
	 * @return array
	 */
	public function provides()
	{
		return array('brain_socket','command.brainsocket.start');
	}

}