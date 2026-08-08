/* ── Search — National 5 Computing Science ────────────────── */
(function () {
  /* Determine root prefix the same way nav.js does */
  const ROOT = (function () {
    const depth = document.documentElement.dataset.depth || '0';
    return '../'.repeat(parseInt(depth, 10));
  })();

  /* ── Search Index ────────────────────────────────────────── */
  const INDEX = [

    /* ── SDD: Iterative Development ─── */
    { term: 'Iterative development', desc: 'Repeating or revisiting development phases — e.g. returning to design after testing finds a problem', page: 'sdd/development-methodologies.html', section: 'SDD' },
    { term: 'Software development process', desc: 'Analysis → Design → Implementation → Testing → Documentation → Evaluation', page: 'sdd/development-methodologies.html', section: 'SDD' },
    { term: 'Iteration', desc: 'Repeating a process — revisiting phases that have already been worked on', page: 'sdd/development-methodologies.html', section: 'SDD' },
    { term: 'Documentation', desc: 'Producing supporting documents such as a user guide and technical guide', page: 'sdd/development-methodologies.html', section: 'SDD' },

    /* ── SDD: Analysis ─── */
    { term: 'Analysis', desc: 'Identifying the purpose and functional requirements of a problem', page: 'sdd/analysis.html', section: 'SDD' },
    { term: 'Purpose', desc: 'A plain-language statement of what the program will do and for whom', page: 'sdd/analysis.html', section: 'SDD' },
    { term: 'Functional requirements', desc: 'The inputs, processes and outputs a program must have', page: 'sdd/analysis.html', section: 'SDD' },
    { term: 'Inputs', desc: 'Data entered into a program by the user', page: 'sdd/analysis.html', section: 'SDD' },
    { term: 'Processes', desc: 'Calculations carried out, or new data generated, by the program', page: 'sdd/analysis.html', section: 'SDD' },
    { term: 'Outputs', desc: 'Results and messages the program displays to the user', page: 'sdd/analysis.html', section: 'SDD' },
    { term: 'Software specification', desc: 'Legally binding document from analysis stating exactly what the software must do', page: 'sdd/analysis.html', section: 'SDD' },
    { term: 'Systems analyst', desc: 'Gathers requirements by observing, interviewing, studying documents and questionnaires', page: 'sdd/analysis.html', section: 'SDD' },

    /* ── SDD: Design ─── */
    { term: 'Wireframe', desc: 'Sketch of the user interface showing position of inputs/outputs with annotations', page: 'sdd/design.html', section: 'SDD' },
    { term: 'User-interface design', desc: 'Designing the parts of the program the user interacts with, using a wireframe', page: 'sdd/design.html', section: 'SDD' },
    { term: 'Structure diagram', desc: 'Breaks a task into smaller chunks — read top-to-bottom, left-to-right', page: 'sdd/design.html', section: 'SDD' },
    { term: 'Flowchart', desc: 'Standard symbols and arrows showing the order of events — good for decisions and loops', page: 'sdd/design.html', section: 'SDD' },
    { term: 'Pseudocode', desc: 'Line-by-line plan of a program written in structured English, with numbered refinements', page: 'sdd/design.html', section: 'SDD' },
    { term: 'Refinement', desc: 'Expanding a pseudocode step into numbered sub-steps (1.1, 1.2, …)', page: 'sdd/design.html', section: 'SDD' },
    { term: 'Design techniques', desc: 'Structure diagrams, flowcharts and pseudocode — the three N5 design notations', page: 'sdd/design.html', section: 'SDD' },

    /* ── SDD: Output ─── */
    { term: 'print()', desc: 'Python statement that displays messages and variable values on screen', page: 'sdd/output.html', section: 'SDD' },
    { term: 'Internal commentary', desc: 'Lines starting with # that the computer ignores — they explain the code', page: 'sdd/output.html', section: 'SDD' },
    { term: 'Comment', desc: 'A # line ignored by the computer, used to make code readable', page: 'sdd/output.html', section: 'SDD' },
    { term: 'SEND TO DISPLAY', desc: 'SQA reference language for output — SEND "message" & variable TO DISPLAY', page: 'sdd/output.html', section: 'SDD' },

    /* ── SDD: Data Types, Variables & Arrays ─── */
    { term: 'Integer', desc: 'Whole number data type — no decimal point', page: 'sdd/data-types-structures.html', section: 'SDD' },
    { term: 'Real', desc: 'Number data type with a decimal point (e.g. 8.1, 0.99)', page: 'sdd/data-types-structures.html', section: 'SDD' },
    { term: 'String', desc: 'Text data type — words, letters, numbers and symbols', page: 'sdd/data-types-structures.html', section: 'SDD' },
    { term: 'Character', desc: 'A single letter, digit or symbol', page: 'sdd/data-types-structures.html', section: 'SDD' },
    { term: 'Boolean', desc: 'Data type storing only TRUE or FALSE', page: 'sdd/data-types-structures.html', section: 'SDD' },
    { term: 'Variable', desc: 'Stores a single item of data — declared with a meaningful name and data type', page: 'sdd/data-types-structures.html', section: 'SDD' },
    { term: 'Declaring', desc: 'Creating a new variable or array, setting its name and data type', page: 'sdd/data-types-structures.html', section: 'SDD' },
    { term: 'Assigning', desc: 'Placing a value in a variable — overwrites what was there', page: 'sdd/data-types-structures.html', section: 'SDD' },
    { term: 'Initialising', desc: 'Resetting or clearing a variable, usually at the start of a program', page: 'sdd/data-types-structures.html', section: 'SDD' },
    { term: 'Array', desc: 'Data structure storing several items of the same type, accessed by index from 0', page: 'sdd/data-types-structures.html', section: 'SDD' },
    { term: '1D array', desc: 'A list of values of the same type stored under one name — indexes start at 0', page: 'sdd/data-types-structures.html', section: 'SDD' },
    { term: 'Index', desc: 'Position of an element in an array — counting starts at 0', page: 'sdd/data-types-structures.html', section: 'SDD' },
    { term: 'Data structure', desc: 'A variable or an array', page: 'sdd/data-types-structures.html', section: 'SDD' },

    /* ── SDD: User Input ─── */
    { term: 'input()', desc: 'Python statement for keyboard input — always returns a string', page: 'sdd/user-input.html', section: 'SDD' },
    { term: 'Casting', desc: 'Converting input to the right type with int() or float()', page: 'sdd/user-input.html', section: 'SDD' },
    { term: 'int()', desc: 'Casts input to an integer — needed before whole-number calculations', page: 'sdd/user-input.html', section: 'SDD' },
    { term: 'float()', desc: 'Casts input to a real number — needed for decimals like prices', page: 'sdd/user-input.html', section: 'SDD' },
    { term: 'RECEIVE FROM KEYBOARD', desc: 'SQA reference language for input — RECEIVE age FROM (INTEGER) KEYBOARD', page: 'sdd/user-input.html', section: 'SDD' },

    /* ── SDD: Calculations ─── */
    { term: 'Arithmetic operators', desc: 'Addition +, subtraction -, multiplication *, division /, exponentiation **', page: 'sdd/calculations.html', section: 'SDD' },
    { term: 'Exponentiation', desc: 'Raising to a power — num ** 2 squares a number (^ in reference language)', page: 'sdd/calculations.html', section: 'SDD' },
    { term: 'Concatenation', desc: 'Joining strings together with + (or & in reference language)', page: 'sdd/calculations.html', section: 'SDD' },

    /* ── SDD: Selection ─── */
    { term: 'Selection', desc: 'IF statements — the program follows different paths depending on a condition', page: 'sdd/selection.html', section: 'SDD' },
    { term: 'IF statement', desc: 'Runs code only when a condition is true; ELSE gives the alternative path', page: 'sdd/selection.html', section: 'SDD' },
    { term: 'elif', desc: 'Else-if: checks a new condition only if the ones above were false', page: 'sdd/selection.html', section: 'SDD' },
    { term: 'Complex condition', desc: 'A condition using two or more comparisons joined with AND/OR/NOT', page: 'sdd/selection.html', section: 'SDD' },
    { term: 'Logical operators', desc: 'AND (both true), OR (either true), NOT (flips the result)', page: 'sdd/selection.html', section: 'SDD' },
    { term: 'Comparison operators', desc: '== equal, != not equal, < > <= >= comparisons in conditions', page: 'sdd/selection.html', section: 'SDD' },

    /* ── SDD: Pre-Defined Functions ─── */
    { term: 'Pre-defined function', desc: 'Built-in function with parameters — random, round and length at N5', page: 'sdd/pre-defined-functions.html', section: 'SDD' },
    { term: 'random', desc: 'random.randint(1, 6) returns a random integer between two limits', page: 'sdd/pre-defined-functions.html', section: 'SDD' },
    { term: 'round', desc: 'Rounds to the nearest whole number, or a given number of decimal places', page: 'sdd/pre-defined-functions.html', section: 'SDD' },
    { term: 'len', desc: 'Returns the length (number of characters) of a string', page: 'sdd/pre-defined-functions.html', section: 'SDD' },
    { term: 'Parameter', desc: 'A value passed to a function inside the brackets', page: 'sdd/pre-defined-functions.html', section: 'SDD' },

    /* ── SDD: Loops ─── */
    { term: 'Fixed loop', desc: 'Repeats a set number of times — for counter in range(10):', page: 'sdd/loops.html', section: 'SDD' },
    { term: 'Conditional loop', desc: 'While loop — repeats only while a condition is true', page: 'sdd/loops.html', section: 'SDD' },
    { term: 'While loop', desc: 'Python conditional loop — repeats while its condition stays true', page: 'sdd/loops.html', section: 'SDD' },
    { term: 'Infinite loop', desc: 'A loop whose condition never becomes false — the program never ends', page: 'sdd/loops.html', section: 'SDD' },
    { term: 'Loop variable', desc: 'The counter in a fixed loop — give it a meaningful name', page: 'sdd/loops.html', section: 'SDD' },

    /* ── SDD: Standard Algorithms ─── */
    { term: 'Standard algorithm', desc: 'One of three N5 algorithms: input validation, running total, traversing a 1-D array', page: 'sdd/standard-algorithms.html', section: 'SDD' },
    { term: 'Input validation', desc: 'Conditional loop that keeps asking until the input is acceptable', page: 'sdd/standard-algorithms.html', section: 'SDD' },
    { term: 'Running total', desc: 'Initialise total to 0, then add each value inside a loop', page: 'sdd/standard-algorithms.html', section: 'SDD' },
    { term: 'Traversing an array', desc: 'Using a loop to visit every element of an array from first to last', page: 'sdd/standard-algorithms.html', section: 'SDD' },

    /* ── SDD: Testing ─── */
    { term: 'Normal data', desc: 'Test data definitely within the accepted range — should be accepted', page: 'sdd/testing.html', section: 'SDD' },
    { term: 'Extreme data', desc: 'Test data on the very edge of the range (boundaries) — still valid', page: 'sdd/testing.html', section: 'SDD' },
    { term: 'Exceptional data', desc: 'Invalid test data the program should reject with an error message', page: 'sdd/testing.html', section: 'SDD' },
    { term: 'Test table', desc: 'Table of test data with expected (and actual) results — one value per row', page: 'sdd/testing.html', section: 'SDD' },
    { term: 'Syntax error', desc: 'Breaking the rules of the language — misspellings, wrong symbols; caught before running', page: 'sdd/testing.html', section: 'SDD' },
    { term: 'Logic error', desc: 'Program runs without error messages but gives the wrong results', page: 'sdd/testing.html', section: 'SDD' },
    { term: 'Execution error', desc: 'Run-time error that crashes the program — e.g. dividing by zero, wrong input type', page: 'sdd/testing.html', section: 'SDD' },

    /* ── SDD: Evaluation ─── */
    { term: 'Fitness for purpose', desc: 'Does the program meet all the functional requirements from analysis?', page: 'sdd/evaluation.html', section: 'SDD' },
    { term: 'Efficient use of coding constructs', desc: 'Using loops and if/elif/else instead of repeated code', page: 'sdd/evaluation.html', section: 'SDD' },
    { term: 'Robustness', desc: 'The program does not crash when given exceptional data', page: 'sdd/evaluation.html', section: 'SDD' },
    { term: 'Readability', desc: 'Internal commentary, meaningful identifiers, indentation and white space', page: 'sdd/evaluation.html', section: 'SDD' },
    { term: 'Meaningful identifiers', desc: 'Variable names like age or password instead of x or k', page: 'sdd/evaluation.html', section: 'SDD' },
    { term: 'Indentation', desc: 'Tabbing code inside ifs and loops so the structure is clear', page: 'sdd/evaluation.html', section: 'SDD' },
    { term: 'White space', desc: 'Blank lines grouping related code together', page: 'sdd/evaluation.html', section: 'SDD' },
    { term: 'Evaluation', desc: 'Judging a program on fitness for purpose, efficiency, robustness and readability', page: 'sdd/evaluation.html', section: 'SDD' },

    /* ── DDD: Introduction ─── */
    { term: 'Field', desc: 'A single piece of information about a person or thing — also called an attribute', page: 'ddd/database-introduction.html', section: 'DDD' },
    { term: 'Record', desc: 'A collection of fields about one particular person or thing', page: 'ddd/database-introduction.html', section: 'DDD' },
    { term: 'Table', desc: 'A collection of records on a particular topic', page: 'ddd/database-introduction.html', section: 'DDD' },
    { term: 'Attribute type', desc: 'Text, number, date, time or Boolean — what sort of data a field holds', page: 'ddd/database-introduction.html', section: 'DDD' },
    { term: 'Database', desc: 'A structured collection of information on a particular topic', page: 'ddd/database-introduction.html', section: 'DDD' },

    /* ── DDD: Analysis ─── */
    { term: 'End-user requirements', desc: 'What the people using the database need to do — "The club leader needs…"', page: 'ddd/analysis.html', section: 'DDD' },
    { term: 'Functional requirements (database)', desc: 'The tables, fields and queries the database must have', page: 'ddd/analysis.html', section: 'DDD' },
    { term: 'GDPR', desc: 'UK data protection law — lawful/fair/transparent, declared purpose, limited, accurate, not kept too long, secure', page: 'ddd/analysis.html', section: 'DDD' },
    { term: 'Data subject', desc: 'The person whose data is stored', page: 'ddd/analysis.html', section: 'DDD' },
    { term: 'Data controller', desc: 'The person or organisation controlling how data is used', page: 'ddd/analysis.html', section: 'DDD' },
    { term: 'Declared purpose', desc: 'The stated reason data was collected — it may only be used for this', page: 'ddd/analysis.html', section: 'DDD' },

    /* ── DDD: Design ─── */
    { term: 'Relational database', desc: 'Two linked tables — avoids the anomalies of a flat file database', page: 'ddd/design.html', section: 'DDD' },
    { term: 'Flat file database', desc: 'A single-table database — suffers insert, update and delete anomalies', page: 'ddd/design.html', section: 'DDD' },
    { term: 'Entity', desc: 'A database table representing a person, object or event', page: 'ddd/design.html', section: 'DDD' },
    { term: 'Attribute', desc: 'A field describing an entity', page: 'ddd/design.html', section: 'DDD' },
    { term: 'Primary key', desc: 'Attribute that uniquely identifies each record — never repeated', page: 'ddd/design.html', section: 'DDD' },
    { term: 'Foreign key', desc: 'An attribute in one entity that is the primary key of another — links the tables', page: 'ddd/design.html', section: 'DDD' },
    { term: 'Referential integrity', desc: 'The data in linked tables must match — deleting a referenced record breaks it', page: 'ddd/design.html', section: 'DDD' },
    { term: 'Data dictionary', desc: 'Plans a table: attribute names, keys, types, sizes, required, validation', page: 'ddd/design.html', section: 'DDD' },
    { term: 'Presence check', desc: 'Validation: the field cannot be left empty', page: 'ddd/design.html', section: 'DDD' },
    { term: 'Restricted choice', desc: 'Validation: only certain values allowed, e.g. S, M or L', page: 'ddd/design.html', section: 'DDD' },
    { term: 'Field length', desc: 'Validation: the value must have a certain number of characters', page: 'ddd/design.html', section: 'DDD' },
    { term: 'Range check', desc: 'Validation: a number must fall between limits, e.g. 0-100', page: 'ddd/design.html', section: 'DDD' },
    { term: 'ER diagram', desc: 'Entity-relationship diagram — entities, attributes, PK underlined, FK starred', page: 'ddd/design.html', section: 'DDD' },
    { term: 'One-to-many', desc: 'One record in an entity links to several records in the other (1:M)', page: 'ddd/design.html', section: 'DDD' },
    { term: 'Relationship', desc: 'A link between two entities, described with a verb (e.g. "directs")', page: 'ddd/design.html', section: 'DDD' },
    { term: 'Query design', desc: 'Planning a query: fields, tables, search criteria and sort order', page: 'ddd/design.html', section: 'DDD' },

    /* ── DDD: SQL SELECT ─── */
    { term: 'SQL', desc: 'Structured Query Language — used to query and update a relational database', page: 'ddd/sql-select.html', section: 'DDD' },
    { term: 'SELECT', desc: 'SQL command for retrieving data — SELECT fields FROM table', page: 'ddd/sql-select.html', section: 'DDD' },
    { term: 'WHERE', desc: 'SQL clause filtering records with conditions using AND, OR, <, >, =', page: 'ddd/sql-select.html', section: 'DDD' },
    { term: 'ORDER BY', desc: 'SQL clause sorting results ASC or DESC — up to two fields at N5', page: 'ddd/sql-select.html', section: 'DDD' },
    { term: 'Wildcard (*)', desc: 'SELECT * displays all fields in the table', page: 'ddd/sql-select.html', section: 'DDD' },

    /* ── DDD: SQL Joins ─── */
    { term: 'Equi-join', desc: 'Joining two tables: WHERE Table1.PrimaryKey = Table2.ForeignKey', page: 'ddd/sql-joins.html', section: 'DDD' },
    { term: 'Join', desc: 'Needed whenever a query uses two tables — match the PK to the FK', page: 'ddd/sql-joins.html', section: 'DDD' },

    /* ── DDD: SQL Insert/Update/Delete ─── */
    { term: 'INSERT', desc: 'INSERT INTO table VALUES (…) — adds a new record, values in field order', page: 'ddd/sql-insert-update-delete.html', section: 'DDD' },
    { term: 'UPDATE', desc: 'UPDATE table SET field = value WHERE … — changes existing records', page: 'ddd/sql-insert-update-delete.html', section: 'DDD' },
    { term: 'DELETE', desc: 'DELETE FROM table WHERE … — removes whole records', page: 'ddd/sql-insert-update-delete.html', section: 'DDD' },
    { term: 'VALUES', desc: 'SQL clause used with INSERT INTO to supply the new record data in field order', page: 'ddd/sql-insert-update-delete.html', section: 'DDD' },
    { term: 'SET', desc: 'SQL clause used with UPDATE to give the new value', page: 'ddd/sql-insert-update-delete.html', section: 'DDD' },

    /* ── DDD: Testing & Evaluation ─── */
    { term: 'Accuracy of output', desc: 'Do the queries produce the expected results? Supported by testing evidence', page: 'ddd/testing-evaluation.html', section: 'DDD' },
    { term: 'Expected output', desc: 'The results a query should produce — compared against actual output when testing', page: 'ddd/testing-evaluation.html', section: 'DDD' },
    { term: 'Fitness for purpose (database)', desc: 'The database meets all functional requirements — every table and query works', page: 'ddd/testing-evaluation.html', section: 'DDD' },

    /* ── CS: Numbers ─── */
    { term: 'Binary', desc: 'Base-2 number system using only 0 and 1 — how computers store numbers', page: 'cs/data-representation-numbers.html', section: 'CS' },
    { term: 'Denary', desc: 'Base-10 number system (normal counting numbers)', page: 'cs/data-representation-numbers.html', section: 'CS' },
    { term: 'Binary conversion', desc: 'Place values 128, 64, 32, 16, 8, 4, 2, 1 — add the columns with a 1', page: 'cs/data-representation-numbers.html', section: 'CS' },
    { term: 'Floating-point', desc: 'How real numbers are stored — with a mantissa and an exponent', page: 'cs/data-representation-numbers.html', section: 'CS' },
    { term: 'Mantissa', desc: 'The digits part of a floating-point number — governs precision', page: 'cs/data-representation-numbers.html', section: 'CS' },
    { term: 'Exponent', desc: 'The power part of a floating-point number — governs range', page: 'cs/data-representation-numbers.html', section: 'CS' },
    { term: 'Bit', desc: 'A single binary digit — 0 or 1', page: 'cs/data-representation-numbers.html', section: 'CS' },
    { term: 'Byte', desc: 'A group of 8 bits', page: 'cs/data-representation-numbers.html', section: 'CS' },

    /* ── CS: Text & Graphics ─── */
    { term: 'ASCII', desc: 'Each character has a code (A = 65) stored in binary', page: 'cs/data-representation-text-graphics.html', section: 'CS' },
    { term: 'Extended ASCII', desc: '8-bit text encoding — 256 characters, printable and control', page: 'cs/data-representation-text-graphics.html', section: 'CS' },
    { term: 'Control characters', desc: 'ASCII characters without printed symbols — escape, delete', page: 'cs/data-representation-text-graphics.html', section: 'CS' },
    { term: 'Bitmap', desc: 'Image stored as a grid of pixels, each with a colour (binary value)', page: 'cs/data-representation-text-graphics.html', section: 'CS' },
    { term: 'Pixel', desc: 'One square in a bitmap grid — stores a colour as a binary value', page: 'cs/data-representation-text-graphics.html', section: 'CS' },
    { term: 'Vector', desc: 'Image stored as objects (rectangle, ellipse, line, polygon) with attributes', page: 'cs/data-representation-text-graphics.html', section: 'CS' },
    { term: 'Vector attributes', desc: 'Co-ordinates, fill colour and line colour (lines have no fill!)', page: 'cs/data-representation-text-graphics.html', section: 'CS' },
    { term: 'True Colour', desc: '24-bit colour — each pixel can be one of 16,777,216 colours', page: 'cs/data-representation-text-graphics.html', section: 'CS' },

    /* ── CS: Architecture ─── */
    { term: 'Processor', desc: 'Does the computer thinking — registers, ALU and control unit', page: 'cs/computer-architecture.html', section: 'CS' },
    { term: 'ALU', desc: 'Arithmetic Logic Unit — does calculations and logical decisions', page: 'cs/computer-architecture.html', section: 'CS' },
    { term: 'Control unit', desc: 'Decodes and executes instructions, keeps the processor in time', page: 'cs/computer-architecture.html', section: 'CS' },
    { term: 'Register', desc: 'Small, fast memory inside the processor for temporary data', page: 'cs/computer-architecture.html', section: 'CS' },
    { term: 'Memory locations', desc: 'Where data and instructions are stored — each has a unique address', page: 'cs/computer-architecture.html', section: 'CS' },
    { term: 'Data bus', desc: 'Carries data between the processor and memory', page: 'cs/computer-architecture.html', section: 'CS' },
    { term: 'Address bus', desc: 'Carries the address of the memory location being accessed', page: 'cs/computer-architecture.html', section: 'CS' },
    { term: 'Interpreter', desc: 'Translates high-level code line-by-line each time the program runs', page: 'cs/computer-architecture.html', section: 'CS' },
    { term: 'Compiler', desc: 'Translates the whole program to machine code at once', page: 'cs/computer-architecture.html', section: 'CS' },
    { term: 'Machine code', desc: 'Binary 1s and 0s — the only language the processor understands', page: 'cs/computer-architecture.html', section: 'CS' },
    { term: 'Translator', desc: 'Converts high-level code to machine code — interpreters and compilers', page: 'cs/computer-architecture.html', section: 'CS' },

    /* ── CS: Environmental Impact ─── */
    { term: 'Environmental impact', desc: 'Energy use of computers and how settings can reduce it', page: 'cs/environmental-impact.html', section: 'CS' },
    { term: 'Monitor settings', desc: 'Lower brightness; switch off automatically when unused', page: 'cs/environmental-impact.html', section: 'CS' },
    { term: 'Power down settings', desc: 'Power off at a set time of day or after a period unused', page: 'cs/environmental-impact.html', section: 'CS' },
    { term: 'Standby', desc: 'Low-power mode — monitor off, hard drive stops — but still uses some power', page: 'cs/environmental-impact.html', section: 'CS' },

    /* ── CS: Security ─── */
    { term: 'Firewall', desc: 'Software/hardware restricting network access — blocks risky connections and hackers', page: 'cs/security.html', section: 'CS' },
    { term: 'Encryption', desc: 'Making data coded/unreadable so only the intended recipient can understand it', page: 'cs/security.html', section: 'CS' },
  ];

  const SECTION_COLOURS = {
    SDD: { bg: '#00442A', text: '#fff' },
    DDD: { bg: '#002D1C', text: '#fff' },
    CS:  { bg: '#1B6B45', text: '#fff' },
    WDD: { bg: '#92750A', text: '#fff' },
  };

  /* ── Build the search UI ─────────────────────────────────── */
  function init () {
    const wrap = document.getElementById('search-wrap');
    if (!wrap) return;

    const input = document.getElementById('search-input');
    const dropdown = document.getElementById('search-dropdown');
    let activeIndex = -1;
    let results = [];

    function search (query) {
      query = query.trim().toLowerCase();
      if (query.length < 2) { hide(); return; }

      results = INDEX.filter(entry =>
        entry.term.toLowerCase().includes(query) ||
        entry.desc.toLowerCase().includes(query)
      ).slice(0, 10);

      if (results.length === 0) {
        dropdown.innerHTML = '<div class="sd-empty">No results found</div>';
      } else {
        dropdown.innerHTML = results.map((r, i) => {
          const c = SECTION_COLOURS[r.section] || SECTION_COLOURS.SDD;
          const hl = (str) => {
            const re = new RegExp(`(${escapeRe(query)})`, 'gi');
            return str.replace(re, '<mark>$1</mark>');
          };
          return `
            <a class="sd-item" href="${ROOT}${r.page}" data-index="${i}" tabindex="-1">
              <span class="sd-badge" style="background:${c.bg};color:${c.text}">${r.section}</span>
              <span class="sd-text">
                <span class="sd-term">${hl(r.term)}</span>
                <span class="sd-desc">${hl(r.desc)}</span>
              </span>
            </a>`;
        }).join('');
      }

      dropdown.classList.add('open');
      activeIndex = -1;
    }

    function hide () {
      dropdown.classList.remove('open');
      activeIndex = -1;
    }

    function setActive (n) {
      const items = dropdown.querySelectorAll('.sd-item');
      items.forEach(el => el.classList.remove('active'));
      activeIndex = Math.max(-1, Math.min(n, items.length - 1));
      if (activeIndex >= 0) items[activeIndex].classList.add('active');
    }

    function escapeRe (s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

    input.addEventListener('input', () => search(input.value));

    input.addEventListener('keydown', (e) => {
      if (!dropdown.classList.contains('open')) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive(activeIndex + 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(activeIndex - 1); }
      else if (e.key === 'Enter') {
        e.preventDefault();
        const active = dropdown.querySelector('.sd-item.active');
        if (active) active.click();
        else { const first = dropdown.querySelector('.sd-item'); if (first) first.click(); }
      }
      else if (e.key === 'Escape') { hide(); input.blur(); }
    });

    document.addEventListener('click', (e) => {
      if (!wrap.contains(e.target)) hide();
    });

    input.addEventListener('focus', () => {
      if (input.value.trim().length >= 2) search(input.value);
    });
  }

  /* Run after DOM ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
