<header>
    <h2>Ficha de inscrição</h2>
    <p id="service-type"></p>
</header>
<main>
    <div id="steps-info">
        <div class="step-value">
            <h2 id="step-label">00</h2>
            <h4 id="total-steps">/06</h4>
        </div>
        <h3 id="step-title">Title</h3>
    </div>
    <form action="" method="post">
        <div id="steps-container">
            <?php include 'enrollSteps/servicesForm.php'; ?>
            <?php include 'enrollSteps/modalityForm.php'; ?>
            <?php include 'enrollSteps/timetableForm.php'; ?>
            <?php include 'enrollSteps/studentForm.php'; ?>
            <?php include 'enrollSteps/tutorForm.php'; ?>
            <?php include 'enrollSteps/review.php'; ?>
        </div>
    </form>
    <div class="actions">
        <button id="previous-button" class="blue-outline" disabled>&lt; Anterior</button>
        <button id="next-button" class="blue" disabled>Seguinte &gt;</button>
    </div>
</main>
<footer>
    <div id="footer-content">
        <div class="modality-info info">
            <sup>1</sup> O mês de junho é pago em 3 parcelas, a começar no mês seguinte da inscrição.
        </div>
        <div class="timetable-info info">
            <h4>Horário</h4>
            <p>09h00 - 12h00</p>
            <p>14h00 - 19h00</p>
        </div>
        <div class="student-info info">
            <sup>*</sup> Campos obrigatórios.
        </div>
    </div>
    <button class="clear">Contacte-nos</button>
</footer>