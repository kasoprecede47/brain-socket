<?php

namespace BrainSocket;

use Psr\Log\LoggerInterface;
use Illuminate\Contracts\Broadcasting\Broadcaster;

class BrainSocketBroadcaster implements Broadcaster
{
    /**
     * The BrainSocketAppResponse implementation.
     *
     * @var BrainSocketAppResponse
     */
    protected $brainsocket;

    /**
     * Create a new broadcaster instance.
     *
     * @param BrainSocketAppResponse $brainsocket
     * @return void
     */
    public function __construct(BrainSocketAppResponse $brainsocket)
    {
        $this->brainsocket = $brainsocket;
    }

    /**
     * {@inheritdoc}
     */
    public function broadcast(array $channels, $event, array $payload = [])
    {
        foreach($channels as $channel){
            $this->brainsocket->message($this->getEventName($channel,$event),$payload);
        }
    }
    
    public function getEventName($channel,$event){
        return $channel.".".$event;
    }
}
