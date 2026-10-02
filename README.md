# SmartHash

## Intelligent Student Record Lookup Using Hashing

SmartHash is a web-based student record lookup system that demonstrates how hashing can be used to efficiently search and retrieve student records.

## Problem Statement

A university may maintain thousands of student records identified by unique roll numbers. Searching each record one by one can require many comparisons.

SmartHash provides an efficient way to locate student records using a hash table.

## Objectives

- Efficient student record lookup
- Demonstrate hashing in a real-world problem
- Handle collisions using Separate Chaining
- Visualize the hash table and search process
- Compare different searching algorithms

## How It Works

SmartHash uses the following process:

Roll Number → Hash Function → Bucket → Student Record

The hash function used is:

h(key) = key % table_size

Example:

112 % 10 = 2

Therefore, roll number 112 is placed in Bucket 2.

## Collision Handling

A collision occurs when multiple roll numbers produce the same hash index.

Example:

102 % 10 = 2
112 % 10 = 2
122 % 10 = 2

These records are stored in Bucket 2 using Separate Chaining.

## Features

- Student Record Search
- Live Hash Bucket Visualization
- Collision Detection
- Separate Chaining
- Explain My Search
- Add Student Record
- Algorithm Comparison
- Presentation Mode
- Animated User Interface

## Algorithm Comparison

| Algorithm | Time Complexity |
|---|---|
| Linear Search | O(n) |
| Binary Search | O(log n) |
| Hashing | O(1) Average |

Note: Hashing provides O(1) average-case lookup. In the worst case, many collisions can increase the search time.

## Technologies Used

- HTML
- CSS
- JavaScript
- Git
- GitHub
- VS Code

## Project Structure

```text
SmartHash/
├── index.html
├── style.css
├── script.js
└── README.md
