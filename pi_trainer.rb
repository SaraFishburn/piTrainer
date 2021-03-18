# frozen_string_literal: true

require 'bigdecimal/math'
require 'io/console'

def print_pi(limit)
  # define pi
  pi = BigMath.PI(limit).to_s.split('')[2..limit + 2]
  pi.insert 1, '.'

  # print each digit of pi one at a time
  pi.each do |digit|
    print digit
    sleep(0.5)
  end
  print "\r\e[K"
  $stdout.flush

  pi
end

def start_level(limit)
  pi = print_pi(limit)
  return unless compare_digits(pi)

  print "\r\e[K"
  $stdout.flush
  limit += 1
  sleep(0.5)
  start_level(limit)
end

def compare_digits(pi_array)
  pi_array.each do |digit|
    # get user input
    input = $stdin.getch
    print input
    next if input == digit

    puts "\nfailed :("
    play_again_question
    return false
  end
  true
end

def play_again_question
  puts 'Play again? (y/n):'

  case gets.downcase.chomp
  when 'y'
    start_game
  when 'n'
    nil
  else
    puts "INVALID INPUT: Answer must be 'y' or 'n'"
    play_again_question
  end
end

def start_game
  puts 'Welcome to PI Trainer!'
  puts 'How many digits would you like to start with?:'
  limit = [gets.to_i, 1].max
  puts "Let's play!"
  sleep(1)
  start_level(limit)
end

start_game
