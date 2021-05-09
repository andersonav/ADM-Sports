<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Console\Commands\PDVCronOne;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        Commands\PDVCronOne::class,
        Commands\PDVCronTwo::class,
        Commands\PDVCronThree::class
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {

        $schedule->command('pdvone:cron')->dailyAt('07:00')->withoutOverlapping()->before(function () {
            echo "Execução automática 1 iniciada em: " . date("d/m/Y H:i:s") . "\n";
        })
            ->after(function () {
                echo "Execução automática 1 finalizada em: " . date("d/m/Y H:i:s") . "\n";
            });

        $schedule->command('pdvtwo:cron')->twiceDaily(7, 13)->withoutOverlapping()->before(function () {
            echo "Execução automática 2 iniciada em: " . date("d/m/Y H:i:s") . "\n";
        })
            ->after(function () {
                echo "Execução automática 2 finalizada em: " . date("d/m/Y H:i:s") . "\n";
            });

        $schedule->command('pdvthree:cron')->everyTenMinutes()->withoutOverlapping()->before(function () {
            echo "Execução automática 3 iniciada em: " . date("d/m/Y H:i:s") . "\n";
        })
            ->after(function () {
                echo "Execução automática 3 finalizada em: " . date("d/m/Y H:i:s") . "\n";
            });
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
