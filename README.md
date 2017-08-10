# Cryptography-I:
Playing with Node.js Crypto module

## Week 2 - Programming Assignment

  ### Prerequisites:

  $ npm install bitwise-xor

  ### Execution:

  $ node week2-progAssig.js 
  
## Week 3 - Programming Assignment

  ### Execution:

  $ node week3-progAssign.js 
  
## Week 4 - Programming Assignment

  ### Execution:

  $ python week4-progAssign.py
  
## Week 5 - Programming Assignment
Program to compute 'x' discrete log modulo a prime p. Let g be some element in (Zp)* (cyclic group of integers modulo prime p)  and suppose you are given h in (Zp)* such that h=powm(g,x,p) (h = g to the power X modulo p).
Lets write the unknown x base B as x = x0 * B + x1
where x0,x1 are in the range [0,B−1]. Then:
h = powm(g,x,p) = powm(g, x0*B+x1, p)=(gE(B))E(x0)⋅gE(x1)   in Zp. [Let E be the powm operator, exponentiation modulo p]

By moving the term gE(x1) to the other side we obtain

  h/gE(x1)=(gE(B))E(x0)   in Zp.
  
The variables in this equation are x0,x1 and everything else is known: you are given g,h and B=2^20. Since the variables x0 and x1 are now on different sides of the equation we can find a solution using meet in the middle:

First build a hash table of all possible values of the left hand side h/gE(x1) for x1=0,1,…,2^20.
Then for each value x0=0,1,2,…,2^20 check if the right hand side (gB)x0 is in this hash table. If so, then you have found a solution (x0,x1) from which you can compute the required x as x=x0*B+x1.
The overall work is about 2^20 multiplications to build the table and another 2^20 lookups in this table.

  ### Prerequisites:

  $ npm install bignum

  ### Execution:

  $ node week5_progAssign.js 
