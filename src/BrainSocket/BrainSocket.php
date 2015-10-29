<?php
namespace BrainSocket;

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

class BrainSocket extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'brainsocket:start {--port=8080 : The port you want the websocket server to run on (default: 8080) }';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Starts BrainSocket and the Ratchet WebSocket server to start running event-driven apps with Laravel.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $port = $this->option('port');
		$server = new BrainSocketServer();
		$server->start($port);
		$this->info('WebSocket server started on port:'.$port);
		$server->run();
    }
}