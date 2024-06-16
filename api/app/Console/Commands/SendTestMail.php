<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Mail\TestMail;
use Illuminate\Support\Facades\Mail;

class SendTestMail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:send-test-mail';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = new TestMail();
        Mail::to('cserneczkybalint@gmail.com')->send($email);
    }
}
